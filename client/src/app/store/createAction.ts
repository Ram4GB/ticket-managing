const createAction = <T>(type: string) => {
  return (payload: T) => {
    return {
      type,
      payload,
    };
  };
};

export default createAction;
