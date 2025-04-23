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
const LocationSVG = (props) => {
  const { theme, deep, sport, dark} = useContext(ThemeContext);
  return(
  <Svg
      width={428}
      height={319}
      viewBox="0 0 428 319"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#a)">
        <Ellipse
          cx={214}
          cy={171.696}
          rx={246}
          ry={122.304}
          fill={theme.circle1Outline}
          fillOpacity={0.8}
        />
      </G>
      <Ellipse
        cx={213.997}
        cy={171.696}
        rx={229.981}
        ry={122.304}
        fill={theme.splash}
      />
      <G filter="url(#b)">
        <Ellipse
          cx={213.998}
          cy={195.216}
          rx={163.619}
          ry={68.208}
          fill={theme.circle2Outline}
          fillOpacity={0.8}
        />
      </G>
      <Ellipse
        cx={213.997}
        cy={195.216}
        rx={153.321}
        ry={68.208}
        fill={theme.splash}
      />
      <G filter="url(#c)">
        <Ellipse
          cx={214.003}
          cy={211.68}
          rx={68.651}
          ry={30.576}
          fill={theme.circle3Outline}
        />
      </G>
      <Ellipse cx={214.003} cy={211.68} rx={54.921} ry={24.696} fill={theme.splash} />
      <Path
        d="M268.424 211.68c0 6.5-5.884 12.552-15.791 17.007-9.861 4.434-23.518 7.189-38.63 7.189-15.112 0-28.769-2.755-38.63-7.189-9.908-4.455-15.791-10.507-15.791-17.007 0-6.5 5.883-12.551 15.791-17.006 9.861-4.434 23.518-7.19 38.63-7.19 15.112 0 28.769 2.756 38.63 7.19 9.907 4.455 15.791 10.506 15.791 17.006Z"
        stroke={theme.circle4Outline}
        strokeOpacity={0.54}
      />
      <Ellipse cx={214.002} cy={214.032} rx={20.595} ry={9.408} fill={theme.splash} />
      <Path
        d="M234.097 214.032c0 2.283-2.048 4.511-5.74 6.198-3.648 1.666-8.723 2.71-14.355 2.71-5.633 0-10.708-1.044-14.356-2.71-3.692-1.687-5.74-3.915-5.74-6.198 0-2.283 2.048-4.511 5.74-6.198 3.648-1.666 8.723-2.71 14.356-2.71 5.632 0 10.707 1.044 14.355 2.71 3.692 1.687 5.74 3.915 5.74 6.198Z"
        stroke={theme.circle5Outline}
        strokeOpacity={0.36}
      />
      <Path fill="url(#d)" d="M-1.109 0h429.07v199.92H-1.109z" />
      <Path
        d="M241.464 171.697c0 21.952-27.461 40.768-27.461 40.768s-27.46-18.816-27.46-40.768c0-7.486 2.893-14.665 8.043-19.958 5.15-5.293 12.134-8.266 19.417-8.266 7.283 0 14.268 2.973 19.418 8.266 5.15 5.293 8.043 12.472 8.043 19.958Z"
        fill={theme.locationIconOuterFill}
      />
      <Path
        d="M214.005 181.105c5.055 0 9.154-4.212 9.154-9.408s-4.099-9.408-9.154-9.408-9.153 4.212-9.153 9.408 4.098 9.408 9.153 9.408Z"
        fill={theme.locationIconInnerFill}
      />
      <Defs>
        <LinearGradient
          id="d"
          x1={213.425}
          y1={133.476}
          x2={213.425}
          y2={199.92}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={theme.splash} />
          <Stop offset={1} stopColor={theme.splash} stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
);

};

export default LocationSVG;
