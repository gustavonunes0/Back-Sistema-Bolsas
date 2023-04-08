export type ProcessesDTO = {
  id?: string,
  name: string,
  description?: string,
  startDate?: Date,
  endDate?: Date,
  spots: number,
  scholarships: number,
  course: string,
  status?: string,
  whoCreates: string
}