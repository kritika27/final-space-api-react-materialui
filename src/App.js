import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Form from "./Form";

const url = "https://finalspaceapi.com/api/v0/character/?limit=12&sort=desc";

export default function App() {
  const useStyles = makeStyles({
    card: {
      maxWidth: 345,
      boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
      backgroundColor: "#fafafa",
    },
    media: {
      height: 300,
    },
  });
  const classes = useStyles();
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");

  const debounced = useDebouncedCallback((search) => {
    setSearch(search);
  }, 1000);

  const filteredChar = characters.filter((char) => {
    return char.name.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCharacters(data));
  }, []);

  return (
    <div>
      <Container>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
          align="center"
        >
          FINAL SPACE
        </Typography>
        <Form
          onSearchChange={(e) => debounced(e.target.value)}
          search={search}
        />
        <Grid container spacing={3} align="center">
          {filteredChar.map((char) => (
            <Grid item xs={12} lg={4} key={char.id}>
              <Card className={classes.card}>
                <CardMedia className={classes.media} image={char.img_url} />
                <CardContent>
                  <Typography color="primary" variant="h5">
                    {char.name || "Monster"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
