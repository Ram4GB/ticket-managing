const createAction = <T>(type: any) => {
  return (payload: T) => {
    return {
      type,
      payload,
    };
  };
};

export default createAction;
