import mongoose from "mongoose";
const url =
  "mongodb+srv://gabikashani1:i6pmGjD7PWohVCx7@teamapp.pq6eg.mongodb.net/team-app?retryWrites=true&w=majority&appName=TeamApp";

mongoose
  .connect(url)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err: any) => {
    console.log(err);
  });
