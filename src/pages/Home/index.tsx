import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useContext } from "react";
import NewCycleForm from "./components/NewCycleForm";
import Countdown from "./components/Countdown";
import { CycleContext } from "../../contexts/CycleContext";

// zod is for validation
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe uma tarefa"),
  minutesAmount: zod.number().min(5, "Informe pelo menos 5 minutos").max(60, "Informe no máximo60 minutos"),
});

// o zod já tem uma função de exportar a tipagem:
// sempre que preciso referenciar uma variavel no TS, preciso chamar o typeof
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export default function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CycleContext);

  // { register, handleSubmit, watch, formState, reset }
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, formState, reset } = newCycleForm;

  console.log(formState.errors);

  // reset the form to defaultValues
  //TODO: ENTENDER ESSA PARTE
  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log("handleCreateNewCycle:", data);
    createNewCycle(data);
    reset();
  }

  // Like a reactive variable
  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        {/* Context api from ZOD */}
        {/* make register={register}, etc */}
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
