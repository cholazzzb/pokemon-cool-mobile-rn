import {
  Canvas,
  Path,
  Points,
  Text,
  mix,
  useFont,
  useSharedValueEffect,
  useValue,
} from '@shopify/react-native-skia';
import { FunctionComponent, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { XStack } from 'tamagui';

import fontInter from '~assets/fonts/Inter-Regular.ttf';
import { UseGetPokemonDetailByIdData } from '~domains/pokemon/hook';
import {
  StatusArr,
  calculatePolygonPos,
  createPolygonPoints,
  createStatusPolygonPath,
} from '~screens/pokemon-detail/shape';

type StatusTabProps = {
  color: string;
  stats: UseGetPokemonDetailByIdData['status'];
};
const StatusTab: FunctionComponent<StatusTabProps> = (props) => {
  return (
    <XStack
      width="100%"
      height="100%"
      justifyContent="center"
      backgroundColor={props.color}>
      <XStack height={200} width={200}>
        <StatusGraph color={props.color} stats={props.stats} />
      </XStack>
    </XStack>
  );
};

export default StatusTab;

const STATUS_LABEL = ['HP', 'ATK', 'DEF', 'SP.ATK', 'SP.DEF', 'SPD'];
const MAX_STATS = 255;
const GRAPH_ORIGIN = 100;
const fontSize = 12;
type StatusGrapphProps = {
  color: string;
  stats: UseGetPokemonDetailByIdData['status'];
};
const StatusGraph: FunctionComponent<StatusGrapphProps> = (props) => {
  const font = useFont(fontInter, fontSize);

  const statusValues: StatusArr = [
    ...props.stats.map((stat) => (stat.value * GRAPH_ORIGIN) / MAX_STATS),
    (props.stats[0].value * GRAPH_ORIGIN) / MAX_STATS,
  ];

  const progress = useSharedValue(0);
  const statsPath = useValue(
    createStatusPolygonPath(statusValues, GRAPH_ORIGIN, 0, 6),
  );
  useEffect(() => {
    progress.value = withTiming(1 / 100, { duration: 800 });
  }, []);
  useSharedValueEffect(() => {
    const timing = mix(progress.value, 0, 100);
    statsPath.current = createStatusPolygonPath(
      statusValues,
      GRAPH_ORIGIN,
      timing,
      6,
    );
  }, progress);

  if (font === null) {
    return null;
  }

  return (
    <>
      <Canvas
        style={StyleSheet.flatten({ flex: 1, backgroundColor: props.color })}>
        <Points
          points={createPolygonPoints(60, GRAPH_ORIGIN, 6)}
          mode="polygon"
          color="black"
          style="stroke"
          strokeWidth={4}
        />
        <Points
          points={createPolygonPoints(50, GRAPH_ORIGIN, 6)}
          mode="polygon"
          color="black"
          style="stroke"
          strokeWidth={2}
        />
        <Points
          points={createPolygonPoints(40, GRAPH_ORIGIN, 6)}
          mode="polygon"
          color="black"
          style="stroke"
          strokeWidth={2}
        />
        <Points
          points={createPolygonPoints(30, GRAPH_ORIGIN, 6)}
          mode="polygon"
          color="black"
          style="stroke"
          strokeWidth={2}
        />
        <Points
          points={createPolygonPoints(20, GRAPH_ORIGIN, 6)}
          mode="polygon"
          color="black"
          style="stroke"
          strokeWidth={2}
        />
        <Path path={statsPath} color="rgba(255,255,255,0.7)" />
        {STATUS_LABEL.map((label, idx) => {
          const pos = calculatePolygonPos(90, GRAPH_ORIGIN, idx * 60);
          const fontWidth = font.getTextWidth(label ?? '');
          return (
            <Text
              key={`stat-${label}`}
              x={pos.x - fontWidth / 2}
              y={pos.y}
              text={label ?? ''}
              font={font}
            />
          );
        })}
      </Canvas>
    </>
  );
};
