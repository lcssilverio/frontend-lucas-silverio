import React from "react"
import {
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined"

interface NoteCardProps {
  createdAt: string
  id: string
  note: number
  subject: string
  removeCard: () => void
}
export const NoteCard = ({
  createdAt,
  id,
  note,
  removeCard,
  subject,
}: NoteCardProps) => {
  const theme = useTheme()

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(new Date(value))

  const ChooseCardColor = () => {
    switch (subject) {
      case "Biologia":
        return "#CC4090"
      case "Artes":
        return "#05A2C2"
      case "Geografia":
        return "#C26719"
      default:
        return "#9B19C2"
    }
  }

  const ChooseNoteColor = () => {
    if (note < 6) {
      return "#FF5964"
    } else if (note >= 6 && note < 8) {
      return "#FFFF99"
    } else {
      return "#05FF00"
    }
  }

  return (
    <Grid container item xs={5} md={3} alignItems="start">
      <Paper
        elevation={0}
        sx={{
          maxWidth: { xs: "80%", md: theme.spacing(19) },
          minWidth: theme.spacing(14),
          borderRadius: "15px",
          backgroundColor: ChooseCardColor(),
          color: "#ECEDEE",
        }}
      >
        <Grid container gap={1} maxWidth={theme.spacing(18)}>
          <Grid container p={2}>
            <Typography>{subject}</Typography>
            <Typography>{formatDate(createdAt)}</Typography>
          </Grid>
          <Grid
            container
            display="flex"
            mb={2}
            pl={1}
            sx={{
              backgroundColor: "#0F0F0FB2",
              color: ChooseNoteColor(),
            }}
          >
            <InsertChartOutlinedIcon sx={{ fontSize: "18px" }} />
            <Typography ml={1} fontSize="12px" fontWeight="400">
              Nota: {note}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Tooltip title="Remover" placement="right" arrow>
        <IconButton
          aria-label="Remove resultado"
          onClick={removeCard}
          sx={{ color: "#FF5964", padding: "2px" }}
        >
          <DeleteOutlineIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Grid>
  )
}
