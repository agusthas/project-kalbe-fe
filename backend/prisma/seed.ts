import { PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const categories = ['Nature', 'People', 'Technology', 'Animals'];
const users = [
  {
    email: 'alice.smith@gmail.com',
    name: 'Alice Smith',
    password: 'password',
    phone: '08123456789',
    bio: faker.lorem.paragraphs(4),
    avatar: `https://api.dicebear.com/5.x/lorelei/svg?seed=${faker.random.alpha(
      5,
    )}`,
  },
  {
    email: 'john.doe@gmail.com',
    name: 'John Doe',
    password: 'password',
    phone: '08123456781',
    bio: faker.lorem.paragraphs(4),
    avatar: `https://api.dicebear.com/5.x/lorelei/svg?seed=${faker.random.alpha(
      5,
    )}`,
  },
];

async function main() {
  for (const category of categories) {
    const newCategory = await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: {
        name: category,
      },
    });
    console.log(`Created category: ${newCategory.name}`);
  }

  const createdUsers: User[] = [];
  for (const user of users) {
    const newUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
      },
    });
    console.log(`Created user: ${newUser.name}`);
    createdUsers.push(newUser);
  }

  for (const user of users) {
    const userPosts = await prisma.post.createMany({
      data: Array.from({ length: 5 }).map(() => ({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(4, '<br />'),
        image: faker.image.imageUrl(),
        categoryId: faker.datatype.number({ min: 1, max: categories.length }),
        authorId: createdUsers.find((u) => u.email === user.email)?.id,
      })),
    });
    console.log(`Created ${userPosts.count} posts for ${user.name}`);
  }

  // Add random comments count to each post
  console.log('Adding random comments to posts...');
  const posts = await prisma.post.findMany();
  for (const post of posts) {
    const comments = await prisma.comment.createMany({
      data: Array.from({ length: faker.datatype.number(5) }).map(() => ({
        content: faker.lorem.paragraphs(1, '<br />'),
        postId: post.id,
        authorId: faker.datatype.number({ min: 1, max: users.length }),
      })),
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
