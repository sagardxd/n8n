import React from 'react'
import { Play, Trash } from 'lucide-react';
import NodeIcon from './NodeIcon';

const Node = (props: any) => {
    return (
        <div className="relative group w-12 h-12">
            <div className="w-13 h-13 bg-[#414244] rounded-md border-1 border-white">
            </div>

            <NodeIcon
                Icon={Play}
                hoverColor="text-green-300"
                position="top-[-14px] left-1"
            />

            <NodeIcon
                Icon={Trash}
                hoverColor="text-red-300"
                position="top-[-14px] left-4"
            />
        </div>
    )
}

export default Node
