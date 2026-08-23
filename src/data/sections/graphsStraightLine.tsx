/**
 * Section 2 — A Straight Line and Its Multiplier
 *
 * LINKED PAIR: the coin-speed line (left) and the table it comes from (right).
 * Both views read `coinValue` from the store — nothing else connects them — and
 * both write the shared highlight channel `coinLineHighlight`, so pointing at a
 * table row pops its point on the line and pointing at a point pops its row.
 */

import React, { useEffect, useRef, useState, type ReactElement } from "react";
import { SplitLayout, StackLayout } from "@/components/layouts";
import { Block } from "@/components/templates";
import {
    EditableH2,
    EditableParagraph,
    InlineClozeChoice,
    InlineClozeInput,
    InlineFeedback,
    InlineLinkedHighlight,
    InlineScrubbleNumber,
    InteractionHintSequence,
    RevealOnInteraction,
} from "@/components/atoms";
import { Figure, FigureSlider } from "@/components/molecules";
import { useVar, useSetVar } from "@/stores";
import { clamp, useSpring, type Vec2 } from "@/lib/motion";
import {
    choicePropsFromDefinition,
    clozePropsFromDefinition,
    getVariableInfo,
    linkedHighlightPropsFromDefinition,
    numberPropsFromDefinition,
} from "../variables";

// ── Shared model + view constants (the visible tie between the two views) ────

const MIN_COIN_VALUE = 0.5;
const MAX_COIN_VALUE = 3;
const DEFAULT_COIN_VALUE = 1;
const TABLE_ROWS = [1, 2, 3, 4] as const;
const HANDLE_COINS = 5; // the draggable point sits at 5 coins

const VIEW_WIDTH = 380;
const VIEW_HEIGHT = 300;
const PLOT_LEFT = 52;
const PLOT_RIGHT = 350;
const PLOT_BOTTOM = 250;
const PLOT_TOP = 30;
const MAX_COINS = 6;
const MAX_SPEED = 18;
const PX_PER_COIN = (PLOT_RIGHT - PLOT_LEFT) / MAX_COINS;
const PX_PER_SPEED = (PLOT_BOTTOM - PLOT_TOP) / MAX_SPEED;

const INK = "#334155";
const INK_STRUCTURE = "#64748B";
const INK_QUIET = "#CBD5E1";
const GRID = "#E2E8F0";
const ACCENT = "#62D0AD";

const EASE_150 = { transition: "opacity 150ms ease, stroke-width 150ms ease" } as const;

/** ONE formatter per quantity — used by the drawing, the table and the prose. */
const formatSpeed = (value: number) => value.toFixed(1);

const rowId = (coins: number) => `coin-${coins}`;

/** The linked-highlight contract, applied identically in both views. */
const useCoinHighlight = () => {
    const highlight = useVar<string>("coinLineHighlight", "");
    const setVar = useSetVar();
    return {
        active: highlight,
        isActive: (id: string) => highlight === id,
        /** Everything that is not the target recedes while a highlight is live. */
        recede: (id?: string) => (highlight && highlight !== id ? 0.35 : 1),
        hoverProps: (id: string) => ({
            onPointerEnter: () => setVar("coinLineHighlight", id),
            onPointerLeave: () => setVar("coinLineHighlight", ""),
        }),
    };
};

// ── View A — the coin-speed line ─────────────────────────────────────────────

function CoinLineDrawing() {
    const setVar = useSetVar();
    const coinValue = useVar<number>("coinValue", DEFAULT_COIN_VALUE);
    const highlight = useCoinHighlight();

    const [dragging, setDragging] = useState(false);
    const [hovered, setHovered] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);

    const handleScale = useSpring(dragging || hovered ? 1.15 : 1, {
        stiffness: 400,
        damping: 26,
    });

    const xOf = (coins: number) => PLOT_LEFT + coins * PX_PER_COIN;
    const yOf = (speed: number) => PLOT_BOTTOM - speed * PX_PER_SPEED;

    const svgPointFromEvent = (event: React.PointerEvent): Vec2 => {
        const svg = svgRef.current;
        if (!svg) return { x: 0, y: 0 };
        const rect = svg.getBoundingClientRect();
        return {
            x: ((event.clientX - rect.left) / rect.width) * VIEW_WIDTH,
            y: ((event.clientY - rect.top) / rect.height) * VIEW_HEIGHT,
        };
    };

    // 1:1 tracking: the pointer's height at 5 coins IS the coin value.
    const handlePointerMove = (event: React.PointerEvent<SVGCircleElement>) => {
        if (!dragging) return;
        const point = svgPointFromEvent(event);
        const speed = (PLOT_BOTTOM - point.y) / PX_PER_SPEED;
        const next = clamp(speed / HANDLE_COINS, MIN_COIN_VALUE, MAX_COIN_VALUE);
        setVar("coinValue", Math.round(next * 10) / 10);
        setVar("straightLineExplored", true);
    };

    // The slider is another way in, so any change away from the default counts
    // as having explored the figure.
    useEffect(() => {
        if (coinValue !== DEFAULT_COIN_VALUE) setVar("straightLineExplored", true);
    }, [coinValue, setVar]);

    const handleX = xOf(HANDLE_COINS);
    const handleY = yOf(HANDLE_COINS * coinValue);
    const anyHighlight = highlight.active !== "";

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            className="block w-full"
            role="img"
            aria-label="A straight line showing the speed bought by each number of coins"
        >
            <defs>
                <filter id="coin-line-handle-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#0F172A" floodOpacity="0.25" />
                </filter>
            </defs>

            {/* Structure: grid, axes, ticks, labels and the line itself all recede
                together whenever a row is highlighted. */}
            <g opacity={anyHighlight ? 0.35 : 1} style={EASE_150}>
                {[1, 2, 3, 4, 5, 6].map((coins) => (
                    <line
                        key={`grid-x-${coins}`}
                        x1={xOf(coins)}
                        y1={PLOT_TOP}
                        x2={xOf(coins)}
                        y2={PLOT_BOTTOM}
                        stroke={GRID}
                        strokeWidth="1"
                    />
                ))}
                {[6, 12, 18].map((speed) => (
                    <line
                        key={`grid-y-${speed}`}
                        x1={PLOT_LEFT}
                        y1={yOf(speed)}
                        x2={PLOT_RIGHT}
                        y2={yOf(speed)}
                        stroke={GRID}
                        strokeWidth="1"
                    />
                ))}

                <line
                    x1={PLOT_LEFT}
                    y1={PLOT_BOTTOM}
                    x2={PLOT_RIGHT}
                    y2={PLOT_BOTTOM}
                    stroke={INK_STRUCTURE}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <line
                    x1={PLOT_LEFT}
                    y1={PLOT_TOP}
                    x2={PLOT_LEFT}
                    y2={PLOT_BOTTOM}
                    stroke={INK_STRUCTURE}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                <g fontSize="11" fill={INK} style={{ fontVariantNumeric: "tabular-nums" }}>
                    {[0, 1, 2, 3, 4, 5, 6].map((coins) => (
                        <text key={`tick-x-${coins}`} x={xOf(coins)} y={PLOT_BOTTOM + 18} textAnchor="middle">
                            {coins}
                        </text>
                    ))}
                    {[6, 12, 18].map((speed) => (
                        <text key={`tick-y-${speed}`} x={PLOT_LEFT - 8} y={yOf(speed) + 4} textAnchor="end">
                            {speed}
                        </text>
                    ))}
                    <text x={xOf(3)} y={PLOT_BOTTOM + 36} textAnchor="middle" fill={INK_STRUCTURE}>
                        coins collected
                    </text>
                    <text x={PLOT_LEFT - 8} y={PLOT_TOP - 12} textAnchor="start" fill={INK_STRUCTURE}>
                        speed
                    </text>
                </g>

                {/* The line: accent, heaviest stroke, pinned to the corner. */}
                <line
                    x1={xOf(0)}
                    y1={yOf(0)}
                    x2={xOf(MAX_COINS)}
                    y2={yOf(MAX_COINS * coinValue)}
                    stroke={ACCENT}
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </g>

            {/* Live readout — one formatter, tabular numerals. */}
            <text
                x={VIEW_WIDTH - 24}
                y={PLOT_TOP - 12}
                textAnchor="end"
                fontSize="12"
                fill={ACCENT}
                style={{ fontVariantNumeric: "tabular-nums" }}
            >
                {`1 coin = ${formatSpeed(coinValue)} speed`}
            </text>

            {/* One point per table row — each is a highlight counterpart. */}
            {TABLE_ROWS.map((coins) => {
                const id = rowId(coins);
                const active = highlight.isActive(id);
                const cx = xOf(coins);
                const cy = yOf(coins * coinValue);
                return (
                    <g key={id} opacity={highlight.recede(id)} style={EASE_150}>
                        {active && <circle cx={cx} cy={cy} r="13" fill={ACCENT} opacity={0.28} />}
                        {active && (
                            <>
                                <line x1={PLOT_LEFT} y1={cy} x2={cx} y2={cy} stroke={ACCENT} strokeWidth="2" strokeDasharray="4 4" />
                                <line x1={cx} y1={PLOT_BOTTOM} x2={cx} y2={cy} stroke={ACCENT} strokeWidth="2" strokeDasharray="4 4" />
                            </>
                        )}
                        <circle cx={cx} cy={cy} r={active ? 7 : 5} fill={ACCENT} style={EASE_150} />
                        {active && (
                            <text
                                x={cx}
                                y={cy - 20}
                                textAnchor="middle"
                                fontSize="12"
                                fill={INK}
                                style={{ fontVariantNumeric: "tabular-nums" }}
                            >
                                {`${coins} coins = ${formatSpeed(coins * coinValue)}`}
                            </text>
                        )}
                        <circle cx={cx} cy={cy} r="18" fill="transparent" {...highlight.hoverProps(id)} />
                    </g>
                );
            })}

            {/* The draggable handle at 5 coins. */}
            <g opacity={anyHighlight ? 0.35 : 1} style={EASE_150}>
                <g transform={`translate(${handleX} ${handleY}) scale(${handleScale})`}>
                    <circle r="11" fill={ACCENT} stroke="#FFFFFF" strokeWidth="2" filter="url(#coin-line-handle-shadow)" />
                </g>
            </g>
            <circle
                cx={handleX}
                cy={handleY}
                r="24"
                fill="transparent"
                style={{ cursor: dragging ? "grabbing" : "grab", touchAction: "none" }}
                onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    setDragging(true);
                }}
                onPointerMove={handlePointerMove}
                onPointerUp={() => setDragging(false)}
                onPointerCancel={() => setDragging(false)}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            />
        </svg>
    );
}

function CoinLineFigure() {
    const setVar = useSetVar();
    return (
        <Figure
            id="coin-speed-line"
            onReset={() => {
                setVar("coinValue", DEFAULT_COIN_VALUE);
                setVar("coinLineHighlight", "");
            }}
            caption="Drag the teal dot at the end of the line to change what one coin is worth. Point at any dot to light up its row in the table."
        >
            <CoinLineDrawing />
            <div className="px-6 pb-5">
                <FigureSlider
                    varName="coinValue"
                    label="Speed per coin"
                    {...numberPropsFromDefinition(getVariableInfo("coinValue"))}
                    formatValue={formatSpeed}
                />
            </div>
            <InteractionHintSequence
                hintKey="coin-speed-line-drag"
                steps={[
                    {
                        gesture: "drag-vertical",
                        label: "Drag the teal dot up the line",
                        position: { x: "79%", y: "62%" },
                        dragPath: { type: "line", startOffset: { x: 0, y: 22 }, endOffset: { x: 0, y: -22 } },
                    },
                ]}
            />
        </Figure>
    );
}

// ── View B — the table the line comes from ───────────────────────────────────

function CoinTableDrawing() {
    const coinValue = useVar<number>("coinValue", DEFAULT_COIN_VALUE);
    const highlight = useCoinHighlight();

    return (
        <div className="px-6 pt-6 pb-2">
            <table className="w-full border-collapse text-sm" style={{ fontVariantNumeric: "tabular-nums" }}>
                <thead>
                    <tr style={{ color: INK_STRUCTURE }}>
                        <th className="border-b py-2 text-left font-medium" style={{ borderColor: INK_QUIET }}>
                            Coins collected
                        </th>
                        <th className="border-b py-2 text-right font-medium" style={{ borderColor: INK_QUIET }}>
                            Speed
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map((coins) => {
                        const id = rowId(coins);
                        const active = highlight.isActive(id);
                        return (
                            <tr
                                key={id}
                                style={{
                                    opacity: highlight.recede(id),
                                    backgroundColor: active ? "rgba(98, 208, 173, 0.22)" : "transparent",
                                    transition: "opacity 150ms ease, background-color 150ms ease",
                                    cursor: "default",
                                }}
                                {...highlight.hoverProps(id)}
                            >
                                <td className="border-b py-2 pl-2" style={{ borderColor: GRID, color: INK }}>
                                    {coins}
                                </td>
                                <td
                                    className="border-b py-2 pr-2 text-right"
                                    style={{
                                        borderColor: GRID,
                                        color: ACCENT,
                                        fontWeight: active ? 700 : 500,
                                    }}
                                >
                                    {formatSpeed(coins * coinValue)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pt-3 text-xs" style={{ color: INK_STRUCTURE }}>
                {`Every row is coins × ${formatSpeed(coinValue)}`}
            </div>
        </div>
    );
}

function CoinTableFigure() {
    return (
        <Figure
            id="coin-speed-table"
            caption="The same rule written out row by row. Point at a row to light up its point on the line."
        >
            <CoinTableDrawing />
        </Figure>
    );
}

// ── Blocks ───────────────────────────────────────────────────────────────────

export const graphsStraightLineBlocks: ReactElement[] = [
    <StackLayout key="layout-graphs-straight-line-heading" maxWidth="xl">
        <Block id="graphs-straight-line-heading" padding="md">
            <EditableH2 id="h2-graphs-straight-line-heading" blockId="graphs-straight-line-heading">
                A Straight Line and Its Multiplier
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-graphs-straight-line-setup" maxWidth="xl">
        <Block id="graphs-straight-line-setup" padding="sm">
            <EditableParagraph id="para-graphs-straight-line-setup" blockId="graphs-straight-line-setup">
                Start with the simplest rule a game can use. Every coin you collect in a
                Roblox obby gives you the same extra speed. Two coins, twice the speed. Ten
                coins, ten times the speed. As a rule, speed = a × coins, where a is what one
                coin is worth.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-graphs-straight-line-worked" maxWidth="xl">
        <Block id="graphs-straight-line-worked" padding="sm">
            <EditableParagraph id="para-graphs-straight-line-worked" blockId="graphs-straight-line-worked">
                Work one case out first. If a coin is worth 1, then 4 coins buy 4 speed, and
                the point (4, 4) sits on the graph. If a coin is worth 3, those same 4 coins
                buy 12 speed, and the point jumps to (4, 12). Right now a coin is worth{" "}
                <InlineScrubbleNumber
                    varName="coinValue"
                    {...numberPropsFromDefinition(getVariableInfo("coinValue"))}
                    formatValue={formatSpeed}
                />
                {" "}speed, so drag the teal dot at the end of the line up or down and watch
                every speed in the table move with it. Does the whole graph tilt, or does it
                lift?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <SplitLayout key="layout-graphs-straight-line-pair" ratio="3:2" gap="lg" align="start">
        <Block id="graphs-straight-line-visual" padding="sm" hasVisualization>
            <CoinLineFigure />
        </Block>
        <Block id="graphs-straight-line-table" padding="sm" hasVisualization>
            <CoinTableFigure />
        </Block>
    </SplitLayout>,

    <StackLayout key="layout-graphs-straight-line-insight" maxWidth="xl">
        <Block id="graphs-straight-line-insight" padding="sm">
            <EditableParagraph id="para-graphs-straight-line-insight" blockId="graphs-straight-line-insight">
                Every one of these rules starts in the same place: zero coins, zero speed.
                Changing the value of a coin never lifts the line off that corner, it only
                changes how fast the line climbs away from it. The{" "}
                <InlineLinkedHighlight
                    varName="coinLineHighlight"
                    highlightId="coin-4"
                    {...linkedHighlightPropsFromDefinition(getVariableInfo("coinLineHighlight"))}
                >
                    four coins row
                </InlineLinkedHighlight>
                {" "}and its point on the grid always agree, whatever the line is doing. Hold
                on to that idea, because it carries through all five graph families in this
                lesson.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-graphs-straight-line-question-speed" maxWidth="xl">
        <Block id="graphs-straight-line-question-speed" padding="sm">
            <EditableParagraph id="para-graphs-straight-line-question-speed" blockId="graphs-straight-line-question-speed">
                In a different obby every coin is worth 2 speed. Collecting 5 coins therefore
                gives a speed of{" "}
                <InlineFeedback
                    varName="answerStraightLineSpeed"
                    correctValue="10"
                    position="terminal"
                    successMessage="— exactly, 2 speed per coin five times over is 2 × 5 = 10"
                    failureMessage="— not quite."
                    hint="Each coin is worth 2, so count 2 for every one of the 5 coins"
                >
                    <InlineClozeInput
                        varName="answerStraightLineSpeed"
                        correctAnswer="10"
                        {...clozePropsFromDefinition(getVariableInfo("answerStraightLineSpeed"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-graphs-straight-line-question-shape" maxWidth="xl">
        <Block id="graphs-straight-line-question-shape" padding="sm">
            <EditableParagraph id="para-graphs-straight-line-question-shape" blockId="graphs-straight-line-question-shape">
                <RevealOnInteraction varName="straightLineExplored">
                    Making a coin worth more does one thing to the line, and one thing only:
                    it makes the line{" "}
                    <InlineFeedback
                        varName="answerStraightLineShape"
                        correctValue="tilt more steeply"
                        position="terminal"
                        successMessage="— right, the corner stays pinned and only the climb changes"
                        failureMessage="— have another look."
                        hint="Watch the bottom-left corner while the coin value changes"
                        visualizationHint={{
                            blockId: "graphs-straight-line-visual",
                            hintKey: "feedback-coin-line-tilt",
                            label: "Discover it yourself",
                            resetVars: { coinValue: 0.5, coinLineHighlight: "" },
                            steps: [
                                {
                                    gesture: "drag-vertical",
                                    label: "Drag the teal dot up until a coin is worth about 2 — does the corner move?",
                                    position: { x: "79%", y: "72%" },
                                    dragPath: { type: "line", startOffset: { x: 0, y: 22 }, endOffset: { x: 0, y: -22 } },
                                    completionVar: "coinValue",
                                    completionValue: 2,
                                    completionTolerance: 0.3,
                                },
                                {
                                    gesture: "drag-vertical",
                                    label: "Keep going to 3 — the corner is still pinned, only the climb changed",
                                    position: { x: "79%", y: "40%" },
                                    dragPath: { type: "line", startOffset: { x: 0, y: 18 }, endOffset: { x: 0, y: -18 } },
                                    completionVar: "coinValue",
                                    completionValue: 3,
                                    completionTolerance: 0.3,
                                },
                            ],
                        }}
                    >
                        <InlineClozeChoice
                            varName="answerStraightLineShape"
                            correctAnswer="tilt more steeply"
                            options={["tilt more steeply", "shift upward", "bend into a curve", "slide to the right"]}
                            {...choicePropsFromDefinition(getVariableInfo("answerStraightLineShape"))}
                        />
                    </InlineFeedback>.
                </RevealOnInteraction>
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
