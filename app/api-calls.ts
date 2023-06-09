import { Feedback, Worksheet } from "@prisma/client";

export const getAllWorksheets = async (): Promise<Worksheet[]> => {
  const res = await fetch("/api/get-all-worksheets");
  const data = await res.json();
  const unorganizedWorksheets: Worksheet[] = data.worksheets;
  const organizedWorksheets = unorganizedWorksheets.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
  return organizedWorksheets;
};

export const getWorksheetById = async (id: string): Promise<Worksheet> => {
  const res = await fetch(`/api/get-worksheet?worksheetId=${id}`);
  const data = await res.json();
  return data.worksheet;
};

export const postWorksheet = async (worksheetData: {
  subject: string,
  title: string,
  topic: string,
  num: number
}) => {
  const res = await fetch(`/api/new-worksheet`, {
    method: "POST",
    body: JSON.stringify(worksheetData)
  })
  const data = await res.json()
  return data.newWorksheet
}

export const putWorksheet = async (worksheetData: {
  newName: string,
  id: string
}): Promise<Worksheet> => {
  const res = await fetch(`/api/update-worksheet?worksheetId=${worksheetData.id}&newTitle=${worksheetData.newName}`, {
    method: "PUT"
  })
  const data = await res.json()
  return data.updatedWorksheet
}

export const deleteWorksheet = async (worksheetData: {
  id: string
}): Promise<Worksheet> => {
  const res = await fetch(`/api/delete-worksheet?worksheetId=${worksheetData.id}`, {
    method: "DELETE"
  })
  const data = await res.json()
  return data.deletedWorksheet
}

export const getAllFeedback = async (): Promise<Feedback[]> => {
  const res = await fetch("/api/all-feedback");
  const data = await res.json();
  console.log(data);
  return data.feedbackEntries;
};

export const postFeedback = async (feedbackData: {
  content: string;
  title: string;
  numStars: number;
}): Promise<Feedback> => {
  const res = await fetch(`/api/new-feedback`, {
    method: "POST",
    body: JSON.stringify(feedbackData)
  })
  const data = await res.json()
  return data.newFeedback
};
