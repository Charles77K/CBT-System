export interface IExam {
  _id: string;
  name: string;
  description: string;
  // courses: mongoose.Types.ObjectId[];
  duration: number;
}

export interface ICandidate {
  firstname: string;
  lastname: string;
  email: string;
  phone: number | null;
  examCode: String;
  // exam: mongoose.Types.ObjectId;
  score: number | null;
  done: boolean;
}
