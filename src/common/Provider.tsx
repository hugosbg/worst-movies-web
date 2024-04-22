import React, { createContext, useMemo, useState, Fragment } from 'react';
import { ApiGateway } from '../providers/apiGateway';
import { Alert } from '../components/Alert';

type Context = {
  api: ApiGateway;
};

export const ProviderContext = createContext({} as Context);

type Props = {
  children: React.ReactNode;
};
export default function Provider({ children }: Props) {
  const [alert, setAlert] = useState('');

  const value = useMemo(() => {
    const api = new ApiGateway();

    api.http.interceptors.response.use(undefined, (error) => {
      setAlert(`Ocorreu um erro enesperado. Detalhes: ${error.message}`);
      return Promise.reject(error);
    });

    return {
      api,
    };
  }, []);

  return (
    <Fragment>
      <ProviderContext.Provider value={value}>
        {children}
      </ProviderContext.Provider>
      <Alert onClose={() => setAlert('')} message={alert} open={!!alert} />
    </Fragment>
  );
}
