import { config } from "dotenv";
import { PrismaClient, UserRole } from "@/lib/generated/prisma/client";

// Load environment variables from .env file
config();

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seed...");

  // Limpar dados existentes
  await prisma.user.deleteMany();
  console.log("Dados existentes removidos");

  // ===========================
  // CRIAR ADMINISTRADOR
  // ===========================
  const admin = await prisma.user.create({
    data: {
      role: UserRole.ADMIN,
      name: "Roberto Mendes",
      email: "roberto.mendes@varos.com",
      phone: "(11) 99999-8888",
      age: 42,
      cpf: "10020030044",
      zipCode: "01310-100",
      city: "São Paulo",
      state: "SP",
      street: "Avenida Paulista",
      number: 1578,
    },
  });
  console.log(`✓ Admin criado: ${admin.name}`);

  // ===========================
  // CRIAR CONSULTORES
  // ===========================
  const consultant1 = await prisma.user.create({
    data: {
      role: UserRole.CONSULTANT,
      name: "Juliana Ferreira",
      email: "juliana.ferreira@varos.com",
      phone: "(11) 98765-4321",
      age: 35,
      cpf: "12345678901",
      zipCode: "04538-133",
      city: "São Paulo",
      state: "SP",
      street: "Avenida Brigadeiro Faria Lima",
      number: 2927,
    },
  });

  const consultant2 = await prisma.user.create({
    data: {
      role: UserRole.CONSULTANT,
      name: "Carlos Eduardo Santos",
      email: "carlos.santos@varos.com",
      phone: "(21) 97654-3210",
      age: 38,
      cpf: "98765432100",
      zipCode: "20040-020",
      city: "Rio de Janeiro",
      state: "RJ",
      street: "Avenida Rio Branco",
      number: 156,
    },
  });

  const consultant3 = await prisma.user.create({
    data: {
      role: UserRole.CONSULTANT,
      name: "Patricia Oliveira",
      email: "patricia.oliveira@varos.com",
      phone: "(31) 99876-5432",
      age: 33,
      cpf: "45678912300",
      zipCode: "30130-010",
      city: "Belo Horizonte",
      state: "MG",
      street: "Avenida Afonso Pena",
      number: 1234,
    },
  });

  const consultant4 = await prisma.user.create({
    data: {
      role: UserRole.CONSULTANT,
      name: "Ricardo Almeida",
      email: "ricardo.almeida@varos.com",
      phone: "(41) 98888-7777",
      age: 40,
      cpf: "78945612300",
      zipCode: "80060-000",
      city: "Curitiba",
      state: "PR",
      street: "Rua XV de Novembro",
      number: 999,
    },
  });

  const consultant5 = await prisma.user.create({
    data: {
      role: UserRole.CONSULTANT,
      name: "Fernanda Costa",
      email: "fernanda.costa@varos.com",
      phone: "(51) 97777-6666",
      age: 31,
      cpf: "32165498700",
      zipCode: "90010-270",
      city: "Porto Alegre",
      state: "RS",
      street: "Avenida Borges de Medeiros",
      number: 500,
    },
  });

  console.log(`✓ 5 Consultores criados`);

  // ===========================
  // CRIAR CLIENTES - Consultor 1 (Juliana)
  // ===========================
  await prisma.user.createMany({
    data: [
      {
        role: UserRole.CLIENT,
        name: "Bruno Henrique Silva",
        email: "bruno.silva@email.com",
        phone: "(11) 91234-5678",
        age: 28,
        cpf: "11111111111",
        zipCode: "01310-200",
        city: "São Paulo",
        state: "SP",
        street: "Rua Augusta",
        number: 1500,
        consultantId: consultant1.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Ana Paula Costa",
        email: "ana.costa@email.com",
        phone: "(11) 92345-6789",
        age: 25,
        cpf: "22222222222",
        zipCode: "01452-000",
        city: "São Paulo",
        state: "SP",
        street: "Rua da Consolação",
        number: 2358,
        consultantId: consultant1.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Lucas Rodrigues",
        email: "lucas.rodrigues@email.com",
        phone: "(11) 93456-7890",
        age: 32,
        cpf: "33333333333",
        zipCode: "05402-000",
        city: "São Paulo",
        state: "SP",
        street: "Rua Rebouças",
        number: 3970,
        consultantId: consultant1.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Mariana Souza",
        email: "mariana.souza@email.com",
        phone: "(11) 94567-8901",
        age: 29,
        cpf: "44444444444",
        zipCode: "01419-001",
        city: "São Paulo",
        state: "SP",
        street: "Rua Oscar Freire",
        number: 379,
        consultantId: consultant1.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Felipe Martins",
        email: "felipe.martins@email.com",
        phone: "(11) 95678-9012",
        age: 35,
        cpf: "55555555555",
        zipCode: "04094-050",
        city: "São Paulo",
        state: "SP",
        street: "Rua Vergueiro",
        number: 7500,
        consultantId: consultant1.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Camila Barbosa",
        email: "camila.barbosa@email.com",
        phone: "(11) 96789-0123",
        age: 27,
        cpf: "66666666666",
        zipCode: "05508-000",
        city: "São Paulo",
        state: "SP",
        street: "Avenida Rebouças",
        number: 1234,
        consultantId: consultant1.id,
      },
    ],
  });

  // ===========================
  // CRIAR CLIENTES - Consultor 2 (Carlos)
  // ===========================
  await prisma.user.createMany({
    data: [
      {
        role: UserRole.CLIENT,
        name: "Pedro Henrique Alves",
        email: "pedro.alves@email.com",
        phone: "(21) 93456-7890",
        age: 30,
        cpf: "77777777777",
        zipCode: "22640-102",
        city: "Rio de Janeiro",
        state: "RJ",
        street: "Avenida das Américas",
        number: 4666,
        consultantId: consultant2.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Beatriz Lima",
        email: "beatriz.lima@email.com",
        phone: "(21) 94567-8901",
        age: 26,
        cpf: "88888888888",
        zipCode: "22271-000",
        city: "Rio de Janeiro",
        state: "RJ",
        street: "Rua Visconde de Pirajá",
        number: 595,
        consultantId: consultant2.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Rafael Gomes",
        email: "rafael.gomes@email.com",
        phone: "(21) 95678-9012",
        age: 34,
        cpf: "99999999999",
        zipCode: "20031-040",
        city: "Rio de Janeiro",
        state: "RJ",
        street: "Rua da Assembleia",
        number: 100,
        consultantId: consultant2.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Gabriela Santos",
        email: "gabriela.santos@email.com",
        phone: "(21) 96789-0123",
        age: 31,
        cpf: "10101010101",
        zipCode: "22011-010",
        city: "Rio de Janeiro",
        state: "RJ",
        street: "Avenida Atlântica",
        number: 1702,
        consultantId: consultant2.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Thiago Pereira",
        email: "thiago.pereira@email.com",
        phone: "(21) 97890-1234",
        age: 28,
        cpf: "20202020202",
        zipCode: "22430-060",
        city: "Rio de Janeiro",
        state: "RJ",
        street: "Rua Barata Ribeiro",
        number: 489,
        consultantId: consultant2.id,
      },
    ],
  });

  // ===========================
  // CRIAR CLIENTES - Consultor 3 (Patricia)
  // ===========================
  await prisma.user.createMany({
    data: [
      {
        role: UserRole.CLIENT,
        name: "André Luiz Carvalho",
        email: "andre.carvalho@email.com",
        phone: "(31) 91234-5678",
        age: 33,
        cpf: "30303030303",
        zipCode: "30190-001",
        city: "Belo Horizonte",
        state: "MG",
        street: "Avenida Raja Gabaglia",
        number: 2000,
        consultantId: consultant3.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Renata Moreira",
        email: "renata.moreira@email.com",
        phone: "(31) 92345-6789",
        age: 29,
        cpf: "40404040404",
        zipCode: "30130-100",
        city: "Belo Horizonte",
        state: "MG",
        street: "Rua Rio de Janeiro",
        number: 1200,
        consultantId: consultant3.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Gustavo Ribeiro",
        email: "gustavo.ribeiro@email.com",
        phone: "(31) 93456-7890",
        age: 36,
        cpf: "50505050505",
        zipCode: "30140-070",
        city: "Belo Horizonte",
        state: "MG",
        street: "Rua da Bahia",
        number: 1148,
        consultantId: consultant3.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Larissa Fernandes",
        email: "larissa.fernandes@email.com",
        phone: "(31) 94567-8901",
        age: 24,
        cpf: "60606060606",
        zipCode: "30130-110",
        city: "Belo Horizonte",
        state: "MG",
        street: "Rua dos Carijós",
        number: 589,
        consultantId: consultant3.id,
      },
    ],
  });

  // ===========================
  // CRIAR CLIENTES - Consultor 4 (Ricardo)
  // ===========================
  await prisma.user.createMany({
    data: [
      {
        role: UserRole.CLIENT,
        name: "Rodrigo Henrique Souza",
        email: "rodrigo.souza@email.com",
        phone: "(41) 91234-5678",
        age: 31,
        cpf: "70707070707",
        zipCode: "80020-100",
        city: "Curitiba",
        state: "PR",
        street: "Rua Marechal Deodoro",
        number: 630,
        consultantId: consultant4.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Vanessa Cristina Dias",
        email: "vanessa.dias@email.com",
        phone: "(41) 92345-6789",
        age: 27,
        cpf: "80808080808",
        zipCode: "80240-031",
        city: "Curitiba",
        state: "PR",
        street: "Avenida Cândido de Abreu",
        number: 200,
        consultantId: consultant4.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Marcelo Augusto Lima",
        email: "marcelo.lima@email.com",
        phone: "(41) 93456-7890",
        age: 39,
        cpf: "90909090909",
        zipCode: "80730-030",
        city: "Curitiba",
        state: "PR",
        street: "Rua Visconde de Nácar",
        number: 1424,
        consultantId: consultant4.id,
      },
    ],
  });

  // ===========================
  // CRIAR CLIENTES - Consultor 5 (Fernanda)
  // ===========================
  await prisma.user.createMany({
    data: [
      {
        role: UserRole.CLIENT,
        name: "Diego Silva Santos",
        email: "diego.santos@email.com",
        phone: "(51) 91234-5678",
        age: 30,
        cpf: "12312312312",
        zipCode: "90040-371",
        city: "Porto Alegre",
        state: "RS",
        street: "Avenida Independência",
        number: 1000,
        consultantId: consultant5.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Amanda Cristina Rocha",
        email: "amanda.rocha@email.com",
        phone: "(51) 92345-6789",
        age: 26,
        cpf: "23423423423",
        zipCode: "90050-170",
        city: "Porto Alegre",
        state: "RS",
        street: "Rua dos Andradas",
        number: 1234,
        consultantId: consultant5.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Vinicius Machado",
        email: "vinicius.machado@email.com",
        phone: "(51) 93456-7890",
        age: 32,
        cpf: "34534534534",
        zipCode: "90430-001",
        city: "Porto Alegre",
        state: "RS",
        street: "Avenida Protásio Alves",
        number: 5000,
        consultantId: consultant5.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Carolina Machado Nunes",
        email: "carolina.nunes@email.com",
        phone: "(51) 94567-8901",
        age: 28,
        cpf: "45645645645",
        zipCode: "90240-200",
        city: "Porto Alegre",
        state: "RS",
        street: "Avenida Osvaldo Aranha",
        number: 540,
        consultantId: consultant5.id,
      },
      {
        role: UserRole.CLIENT,
        name: "Mateus Henrique Pires",
        email: "mateus.pires@email.com",
        phone: "(51) 95678-9012",
        age: 35,
        cpf: "56756756756",
        zipCode: "91010-000",
        city: "Porto Alegre",
        state: "RS",
        street: "Avenida Assis Brasil",
        number: 3940,
        consultantId: consultant5.id,
      },
    ],
  });

  // ===========================
  // CLIENTES SEM CONSULTOR
  // ===========================
  await prisma.user.createMany({
    data: [
      {
        role: UserRole.CLIENT,
        name: "Roberto Carlos Mendes",
        email: "roberto.mendes@email.com",
        phone: "(85) 91234-5678",
        age: 37,
        cpf: "67867867867",
        zipCode: "60160-230",
        city: "Fortaleza",
        state: "CE",
        street: "Avenida Santos Dumont",
        number: 2828,
        consultantId: null,
      },
      {
        role: UserRole.CLIENT,
        name: "Isabela Cristina Araujo",
        email: "isabela.araujo@email.com",
        phone: "(71) 92345-6789",
        age: 23,
        cpf: "78978978978",
        zipCode: "40140-901",
        city: "Salvador",
        state: "BA",
        street: "Avenida Tancredo Neves",
        number: 1632,
        consultantId: null,
      },
      {
        role: UserRole.CLIENT,
        name: "Leonardo Henrique Castro",
        email: "leonardo.castro@email.com",
        phone: "(81) 93456-7890",
        age: 29,
        cpf: "89089089089",
        zipCode: "50030-230",
        city: "Recife",
        state: "PE",
        street: "Avenida Boa Viagem",
        number: 3050,
        consultantId: null,
      },
    ],
  });

  console.log("✓ Clientes criados:");
  console.log(`  - Juliana (SP): 6 clientes`);
  console.log(`  - Carlos (RJ): 5 clientes`);
  console.log(`  - Patricia (MG): 4 clientes`);
  console.log(`  - Ricardo (PR): 3 clientes`);
  console.log(`  - Fernanda (RS): 5 clientes`);
  console.log(`  - Sem consultor: 3 clientes`);
  console.log(`  - Total: 26 clientes`);

  // Contagem final
  const totalUsers = await prisma.user.count();
  const totalAdmins = await prisma.user.count({
    where: { role: UserRole.ADMIN },
  });
  const totalConsultants = await prisma.user.count({
    where: { role: UserRole.CONSULTANT },
  });
  const totalClients = await prisma.user.count({
    where: { role: UserRole.CLIENT },
  });

  console.log("\n========================================");
  console.log("SEED CONCLUÍDO COM SUCESSO!");
  console.log("========================================");
  console.log(`Total de usuários: ${totalUsers}`);
  console.log(`  - Admins: ${totalAdmins}`);
  console.log(`  - Consultores: ${totalConsultants}`);
  console.log(`  - Clientes: ${totalClients}`);
  console.log("========================================\n");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
