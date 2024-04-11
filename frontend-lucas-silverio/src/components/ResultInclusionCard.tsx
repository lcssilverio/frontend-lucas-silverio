import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import React, { useState } from "react"

interface ResultInclusionCardProps {
  bimester: string
  handleCloseModal: () => void
  isOpen: boolean
  onClickConfirm: (data) => void
}

export const ResultInclusionCard = ({
  bimester,
  handleCloseModal,
  isOpen,
  onClickConfirm,
}: ResultInclusionCardProps) => {
  const theme = useTheme()

  const [note, setNote] = useState(0)
  const [subject, setSubject] = useState("")

  const Replace = (value: string) => {
    return value.replace(/\D/g, "")
  }

  const handleNote = (event: any) => {
    const value = Replace(event.target.value)
    setNote(Number(value))
  }

  const ChooseBimester = () => {
    switch (bimester) {
      case "PRIMEIRO":
        return "Bimestre 1"
      case "SEGUNDO":
        return "Bimestre 2"
      case "TERCEIRO":
        return "Bimestre 3"
      case "QUARTO":
        return "Bimestre 4"
      default:
        break
    }
  }

  const handleCreateResult = () => {
    const params = {
      bimestre: bimester,
      disciplina: subject,
      nota: note,
    }
    onClickConfirm(params)
    setNote(0)
  }

  const CloseModal = () => {
    handleCloseModal()
    setNote(0)
  }

  return (
    <Dialog open={isOpen} onClose={CloseModal}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#0F0F0F",
          color: "#fff",
          padding: theme.spacing(3),
        }}
      >
        <Grid container item direction="column" gap={2}>
          <Grid container justifyContent="space-between">
            <Typography variant="h5">{ChooseBimester()}</Typography>
            <IconButton onClick={CloseModal}>
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Grid>
          <Grid>
            <Typography>Disciplina</Typography>
            <Grid
              container
              justifyContent="center"
              sx={{ gap: 2, direction: { xs: "column", md: "row" } }}
            >
              <Grid container justifyContent="center" gap={2}>
                <Button
                  variant="contained"
                  onClick={() => setSubject("Biologia")}
                  sx={{
                    backgroundColor: "#CC4090",
                    ":hover": { backgroundColor: "#FF9AD3" },
                    borderRadius: theme.spacing(2),
                    minWidth: theme.spacing(15),
                  }}
                >
                  Biologia
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setSubject("Artes")}
                  sx={{
                    backgroundColor: "#05A2C2",
                    ":hover": { backgroundColor: "#57E3FF" },
                    borderRadius: theme.spacing(2),
                    minWidth: theme.spacing(15),
                  }}
                >
                  Artes
                </Button>
              </Grid>
              <Grid container justifyContent="center" gap={2}>
                <Button
                  variant="contained"
                  onClick={() => setSubject("Geografia")}
                  sx={{
                    backgroundColor: "#C26719",
                    ":hover": { backgroundColor: "#FFBD84" },
                    borderRadius: theme.spacing(2),
                    minWidth: theme.spacing(15),
                  }}
                >
                  Geografia
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setSubject("Sociologia")}
                  sx={{
                    backgroundColor: "#9B19C2",
                    ":hover": { backgroundColor: "#EEDE7C" },
                    borderRadius: theme.spacing(2),
                    minWidth: theme.spacing(15),
                  }}
                >
                  Sociologia
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="column">
            <Typography variant="caption">Nota</Typography>
            <TextField
              size="small"
              value={note}
              onChange={(e) => handleNote(e)}
              InputProps={{ style: { color: "#6D6D6D" } }}
              sx={{
                width: theme.spacing(12.5),
                borderRadius: "12px",
                border: "1px solid #6D6D6D",
              }}
            />
          </Grid>
          <Grid container item xs={2} justifyContent="end">
            <Button
              onClick={handleCreateResult}
              variant="contained"
              sx={{
                backgroundColor: "#E9FF1A",
                color: "#000",
                ":hover": { backgroundColor: "#F3FF80" },
                borderRadius: "12px",
              }}
            >
              Continuar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
