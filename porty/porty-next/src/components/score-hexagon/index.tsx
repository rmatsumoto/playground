import React from "react";
import { curveLinearClosed, lineRadial, scaleLinear } from "d3";

/**
 * Hexagonal (radar) plot of the six boot score axes.
 *
 * d3 runs on the server to generate the path data — the output is static SVG,
 * so nothing ships to the client. Colors come from the theme CSS vars, which
 * makes the chart follow light/dark on its own.
 */

export type ScoreAxis = { type: string; title: string };

export type ScoreValue = { type?: string; score?: number };

type Props = {
  axes: ScoreAxis[];
  scores: ScoreValue[];
  /** Highest score the axes are graded against. Grows if data exceeds it. */
  scaleMax?: number;
};

const SIZE = 360;
const CENTER = SIZE / 2;
const OUTER_RADIUS = 108;
const LABEL_RADIUS = OUTER_RADIUS + 30;
const RINGS = 4;

const pointAt = (angle: number, radius: number) => ({
  // d3's radial convention: angle 0 points up, positive turns clockwise.
  x: CENTER + Math.sin(angle) * radius,
  y: CENTER - Math.cos(angle) * radius,
});

const ScoreHexagon = ({ axes, scores, scaleMax = 5 }: Props) => {
  const byType = new Map(
    scores.filter(({ type }) => type).map(({ type, score }) => [type, score]),
  );

  // Missing axes plot at zero but are labelled "—", so an unscored axis is not
  // read as a genuine zero.
  const values = axes.map(({ type }) => byType.get(type));
  const domainMax = Math.max(scaleMax, ...values.map((value) => value ?? 0));

  const angleStep = (Math.PI * 2) / axes.length;
  const radius = scaleLinear().domain([0, domainMax]).range([0, OUTER_RADIUS]);

  const radial = lineRadial<number>()
    .angle((_, i) => i * angleStep)
    .radius((value) => radius(value))
    .curve(curveLinearClosed);

  const ring = (value: number) => radial(axes.map(() => value)) ?? undefined;
  const shape = radial(values.map((value) => value ?? 0)) ?? undefined;

  const label = axes
    .map(({ title }, i) => `${title} ${values[i] ?? "not scored"}`)
    .join(", ");

  return (
    <figure>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="mx-auto block w-full max-w-[24rem]"
        role="img"
        aria-label={`Score breakdown out of ${domainMax}: ${label}`}
      >
        <g transform={`translate(${CENTER} ${CENTER})`}>
          {/* Concentric hexagons, one per tick */}
          {Array.from({ length: RINGS }, (_, i) => (
            <path
              key={`ring-${i}`}
              d={ring((domainMax * (i + 1)) / RINGS)}
              fill="none"
              stroke="var(--rule)"
              strokeWidth={1}
            />
          ))}
        </g>

        {/* Spokes out to each axis vertex */}
        {axes.map(({ type }, i) => {
          const { x, y } = pointAt(i * angleStep, OUTER_RADIUS);
          return (
            <line
              key={`spoke-${type}`}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="var(--rule)"
              strokeWidth={1}
            />
          );
        })}

        <g transform={`translate(${CENTER} ${CENTER})`}>
          <path
            d={shape}
            fill="var(--accent)"
            fillOpacity={0.18}
            stroke="var(--accent)"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </g>

        {/* Vertex markers */}
        {axes.map(({ type, title }, i) => {
          const { x, y } = pointAt(i * angleStep, radius(values[i] ?? 0));
          return (
            <circle key={`dot-${type}`} cx={x} cy={y} r={4} fill="var(--accent)">
              <title>{`${title}: ${values[i] ?? "not scored"}`}</title>
            </circle>
          );
        })}

        {/* Direct labels — value is never carried by color alone */}
        {axes.map(({ type, title }, i) => {
          const { x, y } = pointAt(i * angleStep, LABEL_RADIUS);
          const anchor = x > CENTER + 1 ? "start" : x < CENTER - 1 ? "end" : "middle";
          return (
            <text
              key={`label-${type}`}
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="middle"
              className="font-mono"
              fontSize={10}
              letterSpacing="0.14em"
              fill="var(--foreground)"
              fillOpacity={0.5}
            >
              <tspan>{title.toUpperCase()}</tspan>
              <tspan
                x={x}
                dy={14}
                fill="var(--foreground)"
                fillOpacity={0.85}
                fontSize={12}
              >
                {values[i] ?? "—"}
              </tspan>
            </text>
          );
        })}
      </svg>

      <figcaption className="mt-4 text-center font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/50">
        Each axis scored out of {domainMax}
      </figcaption>
    </figure>
  );
};

export default ScoreHexagon;
