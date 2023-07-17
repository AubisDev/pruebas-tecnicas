import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Book } from "../models";
import { useBook } from "../zustand/useBooks";

interface Props {
  book: Book;
  lectureBook?: boolean;
}

export const BookItem = ({ book, lectureBook }: Props) => {
  const addToLectureList = useBook((state) => state.addToLectureList);
  const removeFromLectureList = useBook((state) => state.removeFromLectureList);
  const userLectureList = useBook((state) => state.userLectureList);
  // const findBookOnLecture = useBook((state) => state.findBookOnLecture);

  const disableBtn =
    !lectureBook &&
    userLectureList.find((storageBook) => storageBook.ISBN === book.ISBN);

  return (
    <Card sx={{ maxWidth: 250 }} component="article">
      <CardMedia
        component="img"
        height="300"
        image={book.cover}
        alt={book.title}
        sx={{
          objectFit: "cover",
          maxHeight: "300",
          objectPosition: "center",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {book.title}
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          fontStyle="italic"
          color="GrayText"
        >
          {book.author.name} {`(${book.year})`}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button
          disabled={!!disableBtn}
          onClick={() =>
            lectureBook
              ? removeFromLectureList(book.ISBN)
              : addToLectureList(book)
          }
          variant="contained"
          size="small"
          fullWidth
          color={`${lectureBook ? "error" : "primary"}`}
        >
          {lectureBook ? "Remove book" : "Add to lecture List"}
        </Button>
      </CardActions>
    </Card>
  );
};
