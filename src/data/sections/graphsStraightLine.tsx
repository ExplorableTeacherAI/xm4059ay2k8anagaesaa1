/**
 * Section 2 — A Straight Line and Its Multiplier (concept prose + visual chooser)
 */

import { type ReactElement } from "react";
import { StackLayout } from "@/components/layouts";
import { Block } from "@/components/templates";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

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
                buy 12 speed, and the point moves to (4, 12). Same four coins, very different
                place on the grid. So does the whole graph tilt, or does it lift?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <Block key="layout-graphs-straight-line-visual" id="graphs-straight-line-visual">
        <VisualOptionCards
            blockId="graphs-straight-line-visual"
            cards={[
                {
                    id: "straight-line-coin-build",
                    title: "An empty grid where a speed line appears one coin at a time",
                    looks:
                        "Imagine a blank grid with a row of coins waiting along the bottom. Each coin a student drops onto the grid leaves a dot showing the speed it buys, and once a few dots are down a straight line joins them up through all of them.",
                    manipulate:
                        "Drop coins onto the grid one by one, then drag the very first dot higher or lower to change what a single coin is worth",
                    reveals:
                        "Every coin adds the same step, so equal steps make a straight line, and the size of one step is the number in front of x.",
                    paradigm: "constructivist",
                },
                {
                    id: "straight-line-table-pair",
                    title: "A coin-speed line beside the table of coins and speeds it comes from",
                    looks:
                        "Imagine a grid on the left with one line rising from the corner, and beside it a small table listing 1 coin, 2 coins, 3 coins and the speed each one buys. Pointing at a row makes its point on the line light up, and pointing at a point lights up its row.",
                    manipulate:
                        "Drag the far end of the line up or down and watch every number in the table change with it",
                    reveals:
                        "The line is just the table's points joined up, so tilting the line rewrites every speed in the table at once.",
                    paradigm: "comparison",
                    recommended: true,
                    secondView: {
                        shows: "A table of coins and the speed each number of coins buys, with the current values",
                        role: "constraining",
                        syncedBy:
                            "the coin value variable, plus a shared hover highlight linking each table row to its point on the line",
                    },
                },
                {
                    id: "straight-line-target-ring",
                    title: "A line from the corner and a target ring floating on the grid",
                    looks:
                        "Imagine a grid with a single line rising from the bottom-left corner, and a small ring sitting somewhere out on the grid, marking a speed a player wants at a certain number of coins. The line swings up and down but always stays pinned to the corner.",
                    manipulate:
                        "Swing the line by its far end until it passes exactly through the ring",
                    reveals:
                        "Only one coin value sends the line through that point, so a single number decides the entire line.",
                    paradigm: "goal",
                },
            ]}
        />
    </Block>,

    <StackLayout key="layout-graphs-straight-line-insight" maxWidth="xl">
        <Block id="graphs-straight-line-insight" padding="sm">
            <EditableParagraph id="para-graphs-straight-line-insight" blockId="graphs-straight-line-insight">
                Every one of these rules starts in the same place: zero coins, zero speed.
                Changing a never lifts the line off that corner. It only changes how fast the
                line climbs away from it. Hold on to that idea, because it is the one that
                carries through all five graph families in this lesson.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
