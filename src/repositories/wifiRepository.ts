import prisma from "../config/database.js"

export async function registerWifi(title : string, userName : string, password : string, userId : number) {
  await prisma.wifis.create({
    data: {
      title,
      userName,
      password,
      ownerId: userId
    }
  }); 
}

export async function findWifi(userId : number, title : string) {
  const result = await prisma.wifis.findFirst({
      where: {
        ownerId: userId,
        title: title
      }
  });
  return result
}



export async function getAllWifisByUserId(userId : number) {
  const result = await prisma.wifis.findMany({
      where: {
        ownerId: userId,
      }
    });
    return result;
}