import React, {  createRef, FC,Component, useEffect, useState, useCallback, useContext } from "react";
import Svg, {
  G,
  Ellipse,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { ThemeContext } from '../../../Contexts/theme-context';
const FacebookSVG = (props) => {
  const { theme, deep, sport, dark} = useContext(ThemeContext);
  return(
    <Svg
    width={31}
    height={29}
    viewBox="0 0 31 29"
    fill="none"
    {...props}
  >
    <Path
      d="M12.8125 28.3417C5.55208 27.1542 0 21.2958 0 14.25C0 6.4125 6.91875 0 15.375 0C23.8313 0 30.75 6.4125 30.75 14.25C30.75 21.2958 25.1979 27.1542 17.9375 28.3417L17.0833 27.7083H13.6667L12.8125 28.3417Z"
      fill="url(#paint0_linear_1337_2238)"
    />
    <Path
      d="M21.3542 18.2087L22.0375 14.2503H17.9375V11.4795C17.9375 10.3712 18.3646 9.50033 20.2438 9.50033H22.2083V5.85866C21.0979 5.70033 19.9021 5.54199 18.7917 5.54199C15.2896 5.54199 12.8125 7.52116 12.8125 11.0837V14.2503H8.96875V18.2087H12.8125V28.2628C13.6667 28.4212 14.5208 28.5003 15.375 28.5003C16.2292 28.5003 17.0833 28.4212 17.9375 28.2628V18.2087H21.3542Z"
      fill={theme.backgroundColor}
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1337_2238"
        x1={-0.056106}
        y1={13.9336}
        x2={30.5853}
        y2={13.9336}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={theme.facebookG1}/>
        <Stop offset={1} stopColor={theme.facebookG2} />
      </LinearGradient>
    </Defs>
  </Svg>
);

};

export default FacebookSVG;
