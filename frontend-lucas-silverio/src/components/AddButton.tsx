import {
  Button,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

interface AddButtonProps {
  handleOpenModal: React.ReactEventHandler
}

export const AddButton = ({ handleOpenModal }: AddButtonProps) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <>
      {matches ? (
        <Tooltip title="Adicionar" placement="right" arrow>
          <IconButton
            onClick={handleOpenModal}
            sx={{
              borderRadius: "12px",
              backgroundColor: "yellow",
              color: "black",
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Adicionar" placement="right" arrow>
          <Button
            onClick={handleOpenModal}
            variant="contained"
            sx={{
              height: theme.spacing(5),
              width: theme.spacing(23),
              fontSize: "16px",
              backgroundColor: "#E9FF1A",
              color: "#000",
              ":hover": { backgroundColor: "#F3FF80" },
            }}
            endIcon={<AddIcon />}
          >
            Lançar Nota
          </Button>
        </Tooltip>
      )}
    </>
  )
}
