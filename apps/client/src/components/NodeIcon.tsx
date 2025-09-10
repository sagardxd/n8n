import React from 'react';

interface NodeIconProps {
    Icon: React.ElementType
    hoverColor: string
    position: string
}

const NodeIcon: React.FC<NodeIconProps> = ({ Icon, hoverColor, position }) => {
    return (
        <div className={`absolute ${position} w-3 h-3 bg-opacity-50 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
            <div className={`text-white hover:${hoverColor} transition-colors duration-200 cursor-pointer`}>
                <Icon size={7} />
            </div>
        </div>
    );
}

export default NodeIcon;
