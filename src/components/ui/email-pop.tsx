export default function EmailPopUp(session) {
  if (session === true) {
    return <></>;
  } else {
    return (
      <>
        <header className="text-center items-center flex justify-center font-bold sticky top-0 left-0 w-screen h-[30px] bg-purple-400 dark:bg-purple-800 text-zinc-900 dark:text-zinc-100">
          Olá, Patrick. Verifique seu e-mail para liberar todas as features.
        </header>
      </>
    );
  }
}
