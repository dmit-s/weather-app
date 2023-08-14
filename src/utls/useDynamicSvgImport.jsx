import { useState, useEffect, useRef } from "react";
export const useDynamicSvgImport = (iconName) => {
  const [loading, setLoading] = useState(true);
  const svgRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const importSvg = async () => {
      const module = await import(`../assets/icons/${iconName}.svg`);
      svgRef.current = await module.ReactComponent;
      setLoading(false);
    };

    if (iconName) {
      importSvg();
    }
  }, [iconName]);

  return { loading, SvgIcon: svgRef.current };
};
