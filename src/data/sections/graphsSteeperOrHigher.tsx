/**
 * Section 3 — Steeper or Higher? (owns the "bigger number just shifts it up" misconception)
 */

import { type ReactElement } from "react";
import { StackLayout } from "@/components/layouts";
import { Block } from "@/components/templates";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

export const graphsSteeperOrHigherBlocks: ReactElement[] = [
    <StackLayout key="layout-graphs-steeper-or-higher-heading" maxWidth="xl">
        <Block id="graphs-steeper-or-higher-heading" padding="md">
            <EditableH2 id="h2-graphs-steeper-or-higher-heading" blockId="graphs-steeper-or-higher-heading">
                Steeper or Higher?
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-graphs-steeper-or-higher-setup" maxWidth="xl">
        <Block id="graphs-steeper-or-higher-setup" padding="sm">
            <EditableParagraph id="para-graphs-steeper-or-higher-setup" blockId="graphs-steeper-or-higher-setup">
                Here is where almost everyone gets caught. If a bigger number makes a graph
                bigger, then surely a bigger number just lifts the whole graph upwards? It is
                a fair guess, and it is wrong in an interesting way.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-graphs-steeper-or-higher-compare" maxWidth="xl">
        <Block id="graphs-steeper-or-higher-compare" padding="sm">
            <EditableParagraph id="para-graphs-steeper-or-higher-compare" blockId="graphs-steeper-or-higher-compare">
                Two players get an upgrade. The first one makes every coin worth triple:
                speed = 3 × coins. The second one hands over a 3-speed head start and leaves
                coins worth 1: speed = coins + 3. Both upgrades use the number 3, and both
                make you faster. Only one of them lifts the graph.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <Block key="layout-graphs-steeper-or-higher-visual" id="graphs-steeper-or-higher-visual">
        <VisualOptionCards
            blockId="graphs-steeper-or-higher-visual"
            cards={[
                {
                    id: "steeper-ghost-prediction",
                    title: "One coin line already drawn, with a faint second line students place themselves",
                    looks:
                        "Imagine a grid with the ordinary coin line drawn across it, and a faint grey copy of that same line lying on top of it. The faint copy can be lifted straight up or swung around the corner, and once a student commits, the real tripled line draws itself so the two can be compared.",
                    manipulate:
                        "Place the faint line where they think tripling the value of every coin puts it, then release it and see the real one arrive",
                    reveals:
                        "Tripling swings the line around the corner instead of lifting it, so the two lines meet at zero coins and separate everywhere else.",
                    targetsMisconception:
                        "Students think a bigger number always just shifts the graph up",
                    paradigm: "prediction",
                    recommended: true,
                },
                {
                    id: "steeper-two-handles",
                    title: "Two lines on one grid: one with a tilt handle, one with a lift handle",
                    looks:
                        "Imagine a single grid carrying two lines in different colours. One has a handle out at its far end that swings it around the corner, and the other has a handle where it meets the vertical axis that slides the whole line straight up and down without changing its slant.",
                    manipulate:
                        "Swing one line by its far end and slide the other by its starting point, then compare where each one has got to at ten coins",
                    reveals:
                        "Multiplying changes the slant and adding changes the height, and these are two completely different jobs.",
                    targetsMisconception:
                        "Students think a bigger number always just shifts the graph up",
                    paradigm: "comparison",
                },
                {
                    id: "steeper-match-the-target",
                    title: "A faint target line already on the grid, with a student line to match to it",
                    looks:
                        "Imagine a faint dashed line drawn across the grid as a target, and a solid line the student controls. Underneath, the rule for the solid line is written out with its two numbers on show, and both numbers change as the line moves.",
                    manipulate:
                        "Drag the solid line onto the dashed one and watch which of the two numbers in the rule has to change",
                    reveals:
                        "Sliding the line up only changes the added number, and swinging it only changes the multiplied number.",
                    paradigm: "inversion",
                },
            ]}
        />
    </Block>,

    <StackLayout key="layout-graphs-steeper-or-higher-insight" maxWidth="xl">
        <Block id="graphs-steeper-or-higher-insight" padding="sm">
            <EditableParagraph id="para-graphs-steeper-or-higher-insight" blockId="graphs-steeper-or-higher-insight">
                Multiplying changes the tilt. Adding changes the height. The head start rule
                gives a line that runs parallel to the original forever, always exactly 3
                above it, while the tripled rule gives a line that crosses it and leaves it
                behind. At 1 coin the head start is ahead, 4 against 3. By 10 coins the
                tripled rule is at 30 and the head start is stuck at 13.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
