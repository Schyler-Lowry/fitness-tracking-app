import React, { createContext, useContext, useState, useEffect } from "react";

type ColorsContextType = {
  appColorScheme: string;
  setAppColorScheme: void;
  colorSchemes: object;
};

const ColorsContext = createContext({});

function ColorsProvider({ children }) {
  const colorSchemes = [
    {
      schemeName: "Teal Gray Repeating",
      value:
        "repeating-linear(to-b, teal.300,teal.600, gray.200,teal.300,teal.600, gray.200, teal.300,teal.600, gray.200)",
    },
    {
      schemeName: "Teal Gray - to Top",
      value: "linear(to-t, teal.300,gray.200)",
    },
    {
      schemeName: "Teal Gray - to Bottom",
      value: "linear(to-b, teal.300,gray.200)",
    },
    {
      schemeName: "Pink Green - to Bottom",
      value: "linear(to-b, pink, green.200)",
    },
    {
      schemeName: "Pink Green - to Top",
      value: "linear(to-t, pink, green.200)",
    },
    {
      schemeName: "Teal Blue Repeating",
      value:
        "repeating-linear(to-b, teal.300,blue.600, gray.200,teal.300,blue.600, gray.200, teal.300,blue.600, gray.200)",
    },
  ];

  const [prefersRandom, setPrefersRandom] = useState(() => {
    const prefersRandomColorScheme = localStorage.getItem(
      "prefersRandomColorScheme"
    );
    if (!prefersRandomColorScheme) return true;
    const parsedChoice = JSON.parse(prefersRandomColorScheme);
    return parsedChoice;
  });

  // const [storedScheme, setStoredScheme] = useState(null);
  // const [appColorScheme, setAppColorScheme] = useState(colorSchemes[0]);
  const [appColorScheme, setAppColorScheme] = useState(() => {
    const userColorScheme = localStorage.getItem("userColorScheme");
    if (prefersRandom) {
      const randomIndex = Math.floor(Math.random() * colorSchemes.length);
      return colorSchemes[randomIndex];
    } else {
      if (!userColorScheme) return;
      const storedUserColorScheme = JSON.parse(userColorScheme);
      return storedUserColorScheme;
    }
  });

  useEffect(() => {
    localStorage.setItem("userColorScheme", JSON.stringify(appColorScheme));
  }, [appColorScheme]);

  useEffect(() => {
    localStorage.setItem(
      "prefersRandomColorScheme",
      JSON.stringify(prefersRandom)
    );
  }, [prefersRandom]);

  return (
    <ColorsContext.Provider
      value={{
        appColorScheme,
        setAppColorScheme,
        colorSchemes,
        prefersRandom,
        setPrefersRandom,
      }}
    >
      {children}
    </ColorsContext.Provider>
  );
}

function useColorsScheme() {
  const context = useContext(ColorsContext);
  if (context === undefined)
    throw new Error("ColorsContext was used outside AuthProvider");
  return context;
}

export { useColorsScheme, ColorsProvider };
