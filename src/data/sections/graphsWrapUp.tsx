/**
 * Section 6 — Wrapping Up (conclusion, text only)
 */

import { type ReactElement } from "react";
import { StackLayout } from "@/components/layouts";
import { Block } from "@/components/templates";
import { EditableH2, EditableParagraph } from "@/components/atoms";

export const graphsWrapUpBlocks: ReactElement[] = [
    <StackLayout key="layout-graphs-wrap-up-heading" maxWidth="xl">
        <Block id="graphs-wrap-up-heading" padding="md">
            <EditableH2 id="h2-graphs-wrap-up-heading" blockId="graphs-wrap-up-heading">
                Wrapping Up
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-graphs-wrap-up-summary" maxWidth="xl">
        <Block id="graphs-wrap-up-summary" padding="sm">
            <EditableParagraph id="para-graphs-wrap-up-summary" blockId="graphs-wrap-up-summary">
                The number in front of x never lifts a graph. It stretches it. A straight line
                tilts, a squared curve narrows, a cubed curve steepens, an experience curve
                takes off sooner, a share curve pulls away from the corner, and a negative
                version of any of them turns over. Lifting is the job of a separate number
                added on the end, and that is a different job entirely.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-graphs-wrap-up-next" maxWidth="xl">
        <Block id="graphs-wrap-up-next" padding="sm">
            <EditableParagraph id="para-graphs-wrap-up-next" blockId="graphs-wrap-up-next">
                That is why a Pokémon level curve, a tower upgrade cost and a shared gem chest
                all look so different on a grid even though each one answers to a single
                number. Next comes what happens when two numbers change at once, which is how
                graphs get pushed sideways as well as up.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
