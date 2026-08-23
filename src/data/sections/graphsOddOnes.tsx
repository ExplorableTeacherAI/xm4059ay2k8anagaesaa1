/**
 * Section 5 — The Two Odd Ones: Exponential and Reciprocal
 */

import { type ReactElement } from "react";
import { StackLayout } from "@/components/layouts";
import { Block } from "@/components/templates";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

export const graphsOddOnesBlocks: ReactElement[] = [
    <StackLayout key="layout-graphs-odd-ones-heading" maxWidth="xl">
        <Block id="graphs-odd-ones-heading" padding="md">
            <EditableH2 id="h2-graphs-odd-ones-heading" blockId="graphs-odd-ones-heading">
                The Two Odd Ones: Exponential and Reciprocal
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-graphs-odd-ones-setup" maxWidth="xl">
        <Block id="graphs-odd-ones-setup" padding="sm">
            <EditableParagraph id="para-graphs-odd-ones-setup" blockId="graphs-odd-ones-setup">
                A Pokémon experience curve is neither a straight line nor a squared curve. It
                is exponential, which means each level multiplies the requirement instead of
                adding to it. Multiplying by 2 each time gives 1, 2, 4, 8, 16, 32. Adding 2
                each time gives 1, 3, 5, 7, 9, 11. Ten steps in, one of them is at 1024 and
                the other has crawled to 21.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-graphs-odd-ones-reciprocal" maxWidth="xl">
        <Block id="graphs-odd-ones-reciprocal" padding="sm">
            <EditableParagraph id="para-graphs-odd-ones-reciprocal" blockId="graphs-odd-ones-reciprocal">
                The reciprocal has the opposite personality. Split a chest of a gems between
                x players and each share is a divided by x. Two players take half each, four
                players take a quarter each, and the more players join the smaller everyone's
                share gets. It shrinks forever without ever reaching zero.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <Block key="layout-graphs-odd-ones-visual" id="graphs-odd-ones-visual">
        <VisualOptionCards
            blockId="graphs-odd-ones-visual"
            cards={[
                {
                    id: "odd-ones-side-by-side",
                    title: "The doubling curve and the shrinking share curve, side by side on one number",
                    looks:
                        "Imagine two grids next to each other. On the left an experience curve that stays low and flat then rockets up the right-hand edge, and on the right a share curve that dives steeply near the axis then flattens out along the bottom without touching it. One number controls both, so changing it reshapes the pair together.",
                    manipulate:
                        "Pull either curve by a point on it and watch the other one respond to the same number",
                    reveals:
                        "One curve runs away upward and the other closes in on the axis forever, yet both are steered by a single number.",
                    paradigm: "comparison",
                    recommended: true,
                    secondView: {
                        shows: "The reciprocal share curve on its own grid at the same vertical scale",
                        role: "complementary",
                        syncedBy:
                            "the shared multiplier variable, plus a hover highlight linking the matching x position on both curves",
                    },
                },
                {
                    id: "odd-ones-level-stepper",
                    title: "An experience bar that fills level by level, drawing its own curve behind it",
                    looks:
                        "Imagine a Pokémon-style experience bar at the bottom of the screen and an empty grid above it. Each step forward adds one level, the bar refills to the new requirement, and a fresh dot lands on the grid so the curve builds itself point by point as the levels go by.",
                    manipulate:
                        "Step forward through the levels one at a time, and change the doubling factor to see the same ten levels land somewhere completely different",
                    reveals:
                        "Nothing much seems to happen for the first few levels, and then the requirement runs away faster than the grid can hold it.",
                    paradigm: "temporal",
                },
                {
                    id: "odd-ones-share-the-chest",
                    title: "A gem chest split between a growing group of players",
                    looks:
                        "Imagine a treasure chest at the top with a row of player figures beneath it, each holding a small pile of gems. Adding a player instantly re-splits the pile so every figure holds less, and a curve at the side records each share as a point.",
                    manipulate:
                        "Add and remove players until every player is holding an exact target number of gems",
                    reveals:
                        "Doubling the number of players halves everyone's share, which is why the curve falls away steeply and then almost flattens.",
                    paradigm: "goal",
                },
            ]}
        />
    </Block>,

    <StackLayout key="layout-graphs-odd-ones-insight" maxWidth="xl">
        <Block id="graphs-odd-ones-insight" padding="sm">
            <EditableParagraph id="para-graphs-odd-ones-insight" blockId="graphs-odd-ones-insight">
                Exponential graphs are the ones that look harmless right up until they are
                not. Change the factor from 2 to 3 and the curve does not simply get steeper,
                it leaves the grid several levels earlier. Reciprocal graphs do the reverse.
                They hug both axes without ever touching them, and changing a pulls the curve
                further from the corner without ever letting it cross.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
