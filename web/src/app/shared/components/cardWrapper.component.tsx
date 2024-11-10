import { Card, CardContent, Grid2 } from "@mui/material";
type CardWrapperProps = {
  children: React.ReactNode;
  width: string;
};
export default function CardWrapper({ children, width }: CardWrapperProps) {
  return (
    <>
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Card sx={{ width, height: "auto", padding: "30px" }}>
          <CardContent>{children}</CardContent>
        </Card>
      </Grid2>
    </>
  );
}
