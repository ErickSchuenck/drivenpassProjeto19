import prisma from "../config/database.js"

export async function findNote(userId : number, title : string){
  const result = await prisma.notes.findFirst({
      where: {
        ownerId: userId,
        title: title
      }
  });
  return result
}

export async function registerNote(userId : number, content : string, title : string) {
  await prisma.notes.create({
    data: {
      ownerId: userId,
      title,
      content}
  }); 
}