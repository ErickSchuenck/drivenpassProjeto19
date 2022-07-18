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

export async function getAllNotes(userId : number) {
  const allNotes = await notesRepository.getAllNotesByUserId(userId)
  return allNotes
}

export async function getNotelById(userId : number, noteId : number) {
  const note = await notesRepository.getNoteById(userId, noteId);
  if (!note) {
    throw {
      status: 404,
      type: 'Not Found',
      message: 'Note not found, please double check the id input'
    }
  }
  return note;
}