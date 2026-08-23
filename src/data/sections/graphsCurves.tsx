/**
 * Section 4 — Curves: Squared and Cubed
 */

import { type ReactElement } from "react";
import { StackLayout } from "@/components/layouts";
import { Block } from "@/components/templates";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

export const graphsCurvesBlocks: ReactElement[] = [
    <StackLayout key="layout-graphs-curves-heading" maxWidth="xl">
        <Block id="graphs-curves-heading" padding="md">
            <EditableH2 id="h2-graphs-curves-heading" blockId="graphs-curves-heading">
                Curves: Squared and Cubed
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-graphs-curves-setup" maxWidth="xl">
        <Block id="graphs-curves-setup" padding="sm">
            <EditableParagraph id="para-graphs-curves-setup" blockId="graphs-curves-setup">
                Not every game rule is as fair as one coin, one step. Upgrading a Roblox tower
                to level x can cost x times x gems, which gets written as x squared. A rule
                that uses x times x times x, written x cubed, climbs faster still.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-graphs-curves-worked" maxWidth="xl">
        <Block id="graphs-curves-worked" padding="sm">
            <EditableParagraph id="para-graphs-curves-worked" blockId="graphs-curves-worked">
                Try one by hand before anything moves. With a = 1, a level-3 upgrade costs
                1 × 3 × 3 = 9 gems. With a = 2, the same upgrade costs 2 × 3 × 3 = 18 gems.
                The multiplier is doing exactly the same job it did on the straight line, but
                this time it is working on a curve. Does that curve tilt, lift, or something
                else entirely?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <Block key="layout-graphs-curves-visual" id="graphs-curves-visual">
        <VisualOptionCards
            blockId="graphs-curves-visual"
            cards={[
                {
                    id: "curves-ghost-stretch",
                    title: "A gem-cost curve with a faint copy of its original shape left behind",
                    looks:
                        "Imagine a U-shaped curve sitting in the middle of a grid with a grab point partway up its right arm. A faint grey copy of the starting curve stays put underneath, so as the solid curve is pulled the gap between the two opens up. Pull it below the axis and the whole U turns over.",
                    manipulate:
                        "Pull the grab point on the curve's arm up to narrow the U, or down through the axis to turn it upside down",
                    reveals:
                        "The multiplier squeezes the curve inwards rather than lifting it, and a negative multiplier flips it over completely.",
                    targetsMisconception:
                        "Students think a bigger number always just shifts the graph up",
                    paradigm: "comparison",
                    recommended: true,
                },
                {
                    id: "curves-squared-cubed-pair",
                    title: "The squared curve and the cubed curve on two grids sharing one number",
                    looks:
                        "Imagine two grids side by side, the U-shaped squared curve on the left and the S-shaped cubed curve on the right. They share one multiplier, so pulling on either one reshapes both together, and pointing at the left half of one curve lights up the left half of the other.",
                    manipulate:
                        "Pull either curve by a point on its arm and watch the other change by exactly the same factor",
                    reveals:
                        "The same multiplier stretches both curves, but only the cubed one dives below the axis on the negative side.",
                    paradigm: "comparison",
                    secondView: {
                        shows: "The cubed curve on its own grid, using the same multiplier and the same vertical scale",
                        role: "complementary",
                        syncedBy:
                            "the multiplier variable, plus a shared hover highlight linking the negative half of each curve",
                    },
                },
                {
                    id: "curves-hit-the-cost",
                    title: "A gem-cost curve and a target marker at a chosen upgrade level",
                    looks:
                        "Imagine a U-shaped curve on a grid with a small marker sitting out at level 4, showing the gem cost a player is willing to pay. The curve can be squeezed or widened, and a running cost reads out beside it as it moves.",
                    manipulate:
                        "Squeeze the curve until it passes exactly through the marker at the cost the player can afford",
                    reveals:
                        "One multiplier fixes the cost at every level at once, so hitting one target sets the price of every other upgrade too.",
                    paradigm: "goal",
                },
            ]}
        />
    </Block>,

    <StackLayout key="layout-graphs-curves-insight" maxWidth="xl">
        <Block id="graphs-curves-insight" padding="sm">
            <EditableParagraph id="para-graphs-curves-insight" blockId="graphs-curves-insight">
                Both curves bend, but they do not bend the same way. Squaring a negative
                number gives a positive answer, so the squared curve turns back upwards into a
                valley shape. Cubing keeps the sign, so the cubed curve dives below the axis
                instead. In both cases a bigger multiplier squeezes the curve inwards, and a
                negative one turns it over, which is a long way from lifting it up.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
