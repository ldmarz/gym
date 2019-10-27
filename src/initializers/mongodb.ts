import { MongoError } from "mongodb";
import mongoose from "mongoose";

const cnx = "mongodb://localhost:27017/test";

export default function  openMongoConnection(): void {
    mongoose.connect(
            cnx,
            { useNewUrlParser: true },
            (error: MongoError): void => {
                if (error) {
                    console.log("error con la connect ");
                    console.log(error);
                }},
        )
        .catch((ex) => {
            console.log("error mongoose");
        });
}
