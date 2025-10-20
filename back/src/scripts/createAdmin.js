import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../prisma.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function createAdmin() {
  console.log("\n🔐 === CRIAÇÃO DE USUÁRIO ADMINISTRADOR ===\n");

  try {
    // Coletar dados
    const name = await question("Nome do Admin: ");
    const email = await question("Email: ");
    const password = await question("Senha: ");
    const confirmPassword = await question("Confirme a senha: ");

    // Validações
    if (!name || !email || !password) {
      console.error("❌ Todos os campos são obrigatórios!");
      rl.close();
      process.exit(1);
    }

    if (password !== confirmPassword) {
      console.error("❌ As senhas não coincidem!");
      rl.close();
      process.exit(1);
    }

    if (password.length < 6) {
      console.error("❌ A senha deve ter no mínimo 6 caracteres!");
      rl.close();
      process.exit(1);
    }

    // Verificar se email já existe
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      console.error(`❌ Já existe um usuário com o email: ${email}`);
      console.log(`   Role atual: ${existing.role}`);

      const update = await question(
        "\n🔄 Deseja atualizar este usuário para ADMIN? (s/n): "
      );
      if (update.toLowerCase() === "s") {
        const passwordHash = await bcrypt.hash(password, 10);
        const updated = await prisma.user.update({
          where: { id: existing.id },
          data: {
            name,
            passwordHash,
            role: "ADMIN"
          }
        });
        console.log("\n✅ Usuário atualizado para ADMIN com sucesso!");
        console.log(`   ID: ${updated.id}`);
        console.log(`   Nome: ${updated.name}`);
        console.log(`   Email: ${updated.email}`);
        console.log(`   Role: ${updated.role}`);
      } else {
        console.log("\n❌ Operação cancelada.");
      }
      rl.close();
      process.exit(0);
    }

    // Criar hash da senha
    const passwordHash = await bcrypt.hash(password, 10);

    // Criar usuário admin
    const admin = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "ADMIN",
        isActive: true
      }
    });

    console.log("\n✅ Administrador criado com sucesso!");
    console.log(`   ID: ${admin.id}`);
    console.log(`   Nome: ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Criado em: ${admin.createdAt}`);
  } catch (error) {
    console.error("\n❌ Erro ao criar administrador:", error.message);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

createAdmin();
