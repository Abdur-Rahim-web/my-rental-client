import React from 'react';
import { Card, CardBody } from '@heroui/react';

export const StatCard = ({ title, value, icon: Icon, className = "" }) => {
    return (
        <Card
            className={`bg-accent rounded-2xl ${className}`}
        >
            <Card.Content className="p-6 flex flex-col gap-6">
                {/* Icon Wrapper */}
                {Icon && (
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-300 text-primary">
                        <Icon width={24} height={24} />
                    </div>
                )}

                {/* Content */}
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-zinc-300">
                        {title}
                    </p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">
                        {value}
                    </h3>
                </div>
            </Card.Content>
        </Card>
    );
};