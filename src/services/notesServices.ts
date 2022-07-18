import * as notesRepository from "../repositories/notesRepository.js"

export async function registerNote(userId : number, content : string, title : string) {
  await checkForNoteUniqueness(userId, title);
  notesRepository.registerNote(userId, content, title)
}

async function checkForNoteUniqueness(userId : number, title : string){
  const note = await notesRepository.findNote(userId, title)
  if (note) {
    throw {
      status: 409,
      type: 'Conflict',
      message: 'You already created a note with this title'
    }
  }
}