import "dotenv/config";
import { prisma } from "../prisma.js";

async function listUsers() {
  console.log("\n👥 === LISTA DE USUÁRIOS ===\n");

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" }
    });

    if (users.length === 0) {
      console.log("📭 Nenhum usuário encontrado.\n");
      return;
    }

    console.log(`Total de usuários: ${users.length}\n`);

    users.forEach((user, index) => {
      const roleIcon =
        user.role === "ADMIN" ? "👑" : user.role === "SELLER" ? "🏪" : "👤";
      const statusIcon = user.isActive ? "✅" : "❌";

      console.log(`${index + 1}. ${roleIcon} ${user.name}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(
        `   Status: ${statusIcon} ${user.isActive ? "Ativo" : "Inativo"}`
      );
      console.log(
        `   Criado em: ${new Date(user.createdAt).toLocaleString("pt-BR")}`
      );
      if (user.phone) console.log(`   Telefone: ${user.phone}`);
      console.log("");
    });

    // Estatísticas
    const admins = users.filter((u) => u.role === "ADMIN").length;
    const sellers = users.filter((u) => u.role === "SELLER").length;
    const regularUsers = users.filter((u) => u.role === "USER").length;

    console.log("📊 Estatísticas:");
    console.log(`   👑 Admins: ${admins}`);
    console.log(`   🏪 Sellers: ${sellers}`);
    console.log(`   👤 Users: ${regularUsers}`);
    console.log("");
  } catch (error) {
    console.error("❌ Erro ao listar usuários:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

listUsers();
