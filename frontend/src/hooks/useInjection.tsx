import { Container, interfaces } from "inversify"
import React, { useContext } from "react"

const InversifyContext = React.createContext<{ container: Container | null }>({
    container: null,
})

type Props = {
    container: Container
    children: any
}

export const InversifyContextProvider: React.FC<Props> = ({
    container,
    children,
}) => (
    <InversifyContext.Provider
        value={{
            container,
        }}
    >
        {children}
    </InversifyContext.Provider>
)

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
    const { container } = useContext(InversifyContext)

    if (!container) {
        throw new Error()
    }
    return container.get<T>(identifier)
}
