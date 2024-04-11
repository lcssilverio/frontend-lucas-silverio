import { Grid, Typography } from "@mui/material"
import { AddButton, NoteCard, ResultInclusionCard } from "../components"
import { useEffect, useState } from "react"
import { api } from "../services/api"

type BimesterType = {
  id: string
  bimestre: string
  disciplina: string
  nota: number
  criadoEm: string
  updated_at: string
}

export const Home = () => {
  const [primeiro, setPrimeiro] = useState<Array<BimesterType>>([])
  const [segundo, setSegundo] = useState<Array<BimesterType>>([])
  const [terceiro, setTerceiro] = useState<Array<BimesterType>>([])
  const [quarto, setQuarto] = useState<Array<BimesterType>>([])
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [selectedBimester, setSelectedBimester] = useState("")

  const handleClickOpen = (bimester) => {
    setSelectedBimester(bimester)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleGetData = async () => {
    try {
      const response = await api.get("/list-all-results")
      setPrimeiro([])
      setSegundo([])
      setTerceiro([])
      setQuarto([])
      response.data.map(async (item: BimesterType, index: number) => {
        if (item.bimestre === "PRIMEIRO") {
          setPrimeiro((primeiro) => [...primeiro, item])
        }
        if (item.bimestre === "SEGUNDO") {
          setSegundo((segundo) => [...segundo, item])
        }
        if (item.bimestre === "TERCEIRO") {
          setTerceiro((terceiro) => [...terceiro, item])
        }
        if (item.bimestre === "QUARTO") {
          setQuarto((quarto) => [...quarto, item])
        }
      })
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const handleRemoveResult = async (item: BimesterType) => {
    try {
      await api.delete(`/remove-result/${item.id}`)
      if (item.bimestre === "PRIMEIRO") {
        setPrimeiro(primeiro.filter((removed) => removed.id !== item.id))
      } else if (item.bimestre === "SEGUNDO") {
        setSegundo(segundo.filter((removed) => removed.id !== item.id))
      } else if (item.bimestre === "TERCEIRO") {
        setTerceiro(terceiro.filter((removed) => removed.id !== item.id))
      } else if (item.bimestre === "QUARTO") {
        setQuarto(quarto.filter((removed) => removed.id !== item.id))
      }
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  const handleCreateResult = async (data) => {
    try {
      await api.post("/create-results", data)
      handleGetData()
      setError(false)
      handleClose()
    } catch (error) {
      setError(true)
      handleClose()
    }
  }

  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      mt={8}
      sx={{
        color: "#fff",
      }}
    >
      <ResultInclusionCard
        bimester={selectedBimester}
        handleCloseModal={handleClose}
        isOpen={open}
        onClickConfirm={handleCreateResult}
      />
      <Grid display="grid" item xs={10} md={8} gap={3}>
        <Grid>
          <Grid container mb={3} justifyContent={"space-between"}>
            <Typography variant="h6">Bimestre 1</Typography>
            <AddButton handleOpenModal={() => handleClickOpen("PRIMEIRO")} />
          </Grid>
          <Grid container sx={{ gap: { xs: 2, md: 0 } }}>
            {primeiro.map((item) => (
              <NoteCard
                key={item.id}
                id={item.id}
                subject={item.disciplina}
                note={item.nota}
                createdAt={item.criadoEm}
                removeCard={() => handleRemoveResult(item)}
              />
            ))}
          </Grid>
        </Grid>
        <Grid>
          <Grid container mb={3} justifyContent={"space-between"}>
            <Typography variant="h6">Bimestre 2</Typography>
            <AddButton handleOpenModal={() => handleClickOpen("SEGUNDO")} />
          </Grid>
          <Grid container>
            {segundo.map((item) => (
              <NoteCard
                key={item.id}
                id={item.id}
                subject={item.disciplina}
                note={item.nota}
                createdAt={item.criadoEm}
                removeCard={() => handleRemoveResult(item)}
              />
            ))}
          </Grid>
        </Grid>

        <Grid>
          <Grid container mb={3} justifyContent={"space-between"}>
            <Typography variant="h6">Bimestre 3</Typography>
            <AddButton handleOpenModal={() => handleClickOpen("TERCEIRO")} />
          </Grid>
          <Grid container>
            {terceiro.map((item) => (
              <NoteCard
                key={item.id}
                id={item.id}
                subject={item.disciplina}
                note={item.nota}
                createdAt={item.criadoEm}
                removeCard={() => handleRemoveResult(item)}
              />
            ))}
          </Grid>
        </Grid>
        <Grid>
          <Grid container mb={3} justifyContent={"space-between"}>
            <Typography variant="h6">Bimestre 4</Typography>
            <AddButton handleOpenModal={() => handleClickOpen("QUARTO")} />
          </Grid>
          <Grid container>
            {quarto.map((item) => (
              <NoteCard
                key={item.id}
                id={item.id}
                subject={item.disciplina}
                note={item.nota}
                createdAt={item.criadoEm}
                removeCard={() => handleRemoveResult(item)}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
