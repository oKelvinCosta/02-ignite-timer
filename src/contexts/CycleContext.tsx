import { createContext, useEffect, useReducer, useState, type ReactNode } from "react";
import { cyclesReducer, type Cycle } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  markCurrentCycleAsFinishedAction,
  interruptCurrentCycleAction,
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;

  markCurrentCycleAsFinished: () => void; // Sent the setCycles itself is more problematic
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CycleContext = createContext({} as CycleContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "@ignite-timer:cycles-state-1.0.0";

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  // state is cycles
  // action is the dispatch value received
  // I can have several states here
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      // How to initialize the state
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      // Initialize the state filling it with the localStorage data
      const storedStateAsJson = localStorage.getItem(STORAGE_KEY);

      if (storedStateAsJson) {
        return JSON.parse(storedStateAsJson);
      }

      // The same as the second parameter
      // cycles: [],
      // activeCycleId: null,
      return initialState;
    }
  );

  // I don't need this anymore
  // const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem(STORAGE_KEY, stateJSON);
  }, [cyclesState]);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );

    dispatch(markCurrentCycleAsFinishedAction());
  }

  // When submitted
  function createNewCycle(data: CreateCycleData) {
    console.log(data);

    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    // setCycles((state) => [...state, newCycle]);

    // dispatch({
    //   type: ActionTypes.ADD_NEW_CYCLE,
    //   payload: { newCycle },
    // });

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);

    // reset the form to defaultValues
  }

  function interruptCurrentCycle() {
    // Eu poderia resolver de uma maneira mais simples também:
    // const updatedCycles = cycles.map(cycle => {
    //   if (cycle.id === activeCycleId) {
    //     return { ...cycle, interruptedDate: new Date() };
    //   }
    //   return cycle;
    // });
    // setCycles(updatedCycles);

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );

    dispatch(interruptCurrentCycleAction());

    // setActiveCycleId(null);
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
