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

export async function getAllNotesByUserId(userId:number) {
  const result = await prisma.notes.findMany({
      where: {
        ownerId: userId,
      }
    });
    return result;
}

export async function getNoteById(userId : number, noteId : number) {
  const result = await prisma.notes.findFirst({
        where: {
            id: noteId,
            ownerId: userId
        }
    });
  return result;
}

export async function deleteNoteById(noteId : number) {
  await prisma.notes.delete({
        where: {
            id: noteId
        }
    })
}