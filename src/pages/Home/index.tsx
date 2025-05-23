import { Play } from "phosphor-react";
import {
  FormContainer,
  HomeContainer,
  Separator,
  CountdownContainer,
  MinutesAmountInput,
  TaskInput,
  StartCountdownButton,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useState } from "react";

// zod is for validation
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe uma tarefa"),
  minutesAmount: zod.number().min(5, "Informe pelo menos 5 minutos").max(60, "Informe no máximo60 minutos"),
});

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

// o zod já tem uma função de exportar a tipagem:
// sempre que preciso referenciar uma variavel no TS, preciso chamar o typeof
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export default function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  console.log(formState.errors);

  // When submitted
  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data);

    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);

    // reset the form to defaultValues
    reset();
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  // Like a reactive variable
  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="taks-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register("task")}
          />

          <datalist id="taks-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            // When submitted, the value will be number
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
