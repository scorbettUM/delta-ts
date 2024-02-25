import { create, compare, atom } from "../src/react";

interface Store {
  boop: {
    value: number[];
    concat: (next: number[]) => (prev: number[]) => Promise<number[]>;
  };
  beep: {
    value: string;
    concat: (next: string) => (prev: string) => string;
  };
}

const useMyCustomStore = create<Store>({
  boop: {
    value: [] as number[],
    concat: (next: number[]) => async (prev: number[]) => prev.concat(next),
  },
  beep: {
    value: "",
    concat: (next: string) => (prev: string) => prev + next,
  },
});

const { beep } = useMyCustomStore(
  ({ beep }) => ({
    beep: beep.value,
    concat: beep.concat,
  }),
  ({ prev, next }) =>
    compare({
      prev: prev.beep,
      next: next.beep,
      is: ({ prev, next }) => next.length > prev.length,
    }),
);

const useMyAtom = atom<typeof beep>(
  beep,
  (set) => (next: string) => {

    return set(next)
  }
);

const {
  value,
  update
} = useMyAtom((state) => ({
  value: state,
  update: state.setState
}));

console.log(update(value + 'Test'));
