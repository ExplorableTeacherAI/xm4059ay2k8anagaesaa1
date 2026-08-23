/**
 * Section 1 — How Numbers Change a Graph's Shape (orientation, text only)
 */

import { type ReactElement } from "react";
import { StackLayout } from "@/components/layouts";
import { Block } from "@/components/templates";
import { EditableH1, EditableParagraph } from "@/components/atoms";

export const graphsIntroductionBlocks: ReactElement[] = [
    <StackLayout key="layout-graphs-introduction-title" maxWidth="xl">
        <Block id="graphs-introduction-title" padding="md">
            <EditableH1 id="h1-graphs-introduction-title" blockId="graphs-introduction-title">
                How Numbers Change a Graph's Shape
            </EditableH1>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-graphs-introduction-hook" maxWidth="xl">
        <Block id="graphs-introduction-hook" padding="sm">
            <EditableParagraph id="para-graphs-introduction-hook" blockId="graphs-introduction-hook">
                In Pokémon, the experience needed for the next level does not climb steadily.
                It creeps up early on, then explodes. In Roblox, a speed boost that doubles
                every second feels nothing like one that adds the same amount every second.
                Both of those are graphs, and the difference between them comes down to a
                single number tucked inside the rule.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-graphs-introduction-promise" maxWidth="xl">
        <Block id="graphs-introduction-promise" padding="sm">
            <EditableParagraph id="para-graphs-introduction-promise" blockId="graphs-introduction-promise">
                That number is what this lesson is about. By the end you will be able to take
                a graph, change one number in its rule, and say what happens to the shape
                before you see it. You already know how to plot a point from a pair of
                coordinates and read one back off a grid, and that is the whole toolkit you
                need to start.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
