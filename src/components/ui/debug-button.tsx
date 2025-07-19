import { Button } from "./button";

export default function DebugButton() {
  let testNumber = 0;
  let data = JSON.stringify({
    description: `Teste de notificação ${testNumber++}`,
  });

  const handleAction = () => {
    fetch("/api/util/create/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body
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
        Ação{" "}
      </Button>
    </>
  );
}
