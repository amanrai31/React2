# CONTENT => Managing state

## Thinking about UI declaratively 

1. Identify your component’s different visual states
2. Determine what triggers those state changes (HumanInput, computerInput) => Draw the flow.
3. Represent the state in memory using useState
4. Remove any non-essential state variables (to avoid bugs and paradoxes)
5. Connect the event handlers to set the state

- `Imperatively` vs `Declaratively`

4. Remove any non-essential state variables

Suppose we have a form that can be in `empty`, `typing`, `submitting`, `success`, `error`. => `Goal is to prevent the cases where the state in memory doesn’t represent any valid UI that you’d want a user to see.`

- Does this state cause a paradox? =>isTyping and isSubmitting can’t both be true, similarly 
isEmpty and isTyping can’t be true at the same time.

- Can you get the same information from the inverse of another state variable? isError is not needed because you can check error !== null instead.

