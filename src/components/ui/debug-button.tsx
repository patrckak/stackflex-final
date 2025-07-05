import { Button } from "./button";

export default function DebugButton() {
  let testNumber = 0;

  const handleAction = () => {
    fetch("/api/util/create/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        id: "1234567",
        data: {JSON.stringify({
          description: `Teste de notificação ${testNumber++}`,
        })},
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <h4>DEBUG BUTTON</h4>
      <Button variant="destructive" onClick={handleAction}>
        {" "}
        Ação{" "}
      </Button>
    </>
  );
}
