'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateSLA } from '@/hooks/use-sla';
import { useTeams } from '@/hooks/use-teams';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CreateSLAPage() {
    const router = useRouter();
    const { mutate: createSLA, isPending } = useCreateSLA();
    const { data: teams = [], isLoading: isLoadingTeams }: { data: any[] | undefined, isLoading: boolean } = useTeams() as any;

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        teamId: '',
        metricType: '',
        targetValue: '',
        thresholdWarning: '',
        thresholdCritical: '',
        measurementWindow: '24h',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!formData.teamId) {
            toast.error('Please select a Team');
            return;
        }

        if (!formData.metricType) {
            toast.error('Please select a Metric Type');
            return;
        }

        createSLA({
            name: formData.name,
            description: formData.description,
            teamId: formData.teamId,
            metricType: formData.metricType,
            targetValue: Number(formData.targetValue),
            thresholdWarning: Number(formData.thresholdWarning),
            thresholdCritical: Number(formData.thresholdCritical),
            measurementWindow: formData.measurementWindow,
        }, {
            onSuccess: () => {
                toast.success('SLA created successfully');
                router.push('/sla');
            },
            onError: (error: any) => {
                const message = error.response?.data?.message;
                if (Array.isArray(message)) {
                    message.forEach((msg: string) => toast.error(msg));
                } else {
                    toast.error(message || 'Failed to create SLA');
                }
            },
        });
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto fade-in">
            <div className="flex items-center gap-4">
                <Link href="/sla">
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-accent/50">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create SLA</h1>
                    <p className="text-muted-foreground">Define a new service level agreement</p>
                </div>
            </div>

            <Card className="border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle>SLA Details</CardTitle>
                    <CardDescription>Enter the parameters for the new SLA.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">SLA Name</Label>
                            <Input
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Response Time SLA"
                                className="rounded-xl border-border/50 min-h-[44px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Brief description of this SLA"
                                className="rounded-xl border-border/50 min-h-[100px] resize-y"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="team">Team</Label>
                            <Select
                                value={formData.teamId}
                                onValueChange={(value: string) => setFormData({ ...formData, teamId: value })}
                                required
                            >
                                <SelectTrigger className="rounded-xl border-border/50 min-h-[44px]">
                                    <SelectValue placeholder="Select a team" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-border/50">
                                    {isLoadingTeams ? (
                                        <div className="p-2 text-center text-muted-foreground">Loading teams...</div>
                                    ) : (
                                        teams?.map((team: any) => (
                                            <SelectItem key={team.id} value={team.id} className="rounded-lg">
                                                {team.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="metricType">Metric Type</Label>
                            <Select
                                value={formData.metricType}
                                onValueChange={(value: string) => setFormData({ ...formData, metricType: value })}
                                required
                            >
                                <SelectTrigger className="rounded-xl border-border/50 min-h-[44px]">
                                    <SelectValue placeholder="Select metric type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-border/50">
                                    <SelectItem value="response_time" className="rounded-lg">Response Time</SelectItem>
                                    <SelectItem value="velocity" className="rounded-lg">Velocity</SelectItem>
                                    <SelectItem value="quality" className="rounded-lg">Quality</SelectItem>
                                    <SelectItem value="throughput" className="rounded-lg">Throughput</SelectItem>
                                    <SelectItem value="cycle_time" className="rounded-lg">Cycle Time</SelectItem>
                                    <SelectItem value="deployment_frequency" className="rounded-lg">Deployment Frequency</SelectItem>
                                    <SelectItem value="mttr" className="rounded-lg">MTTR</SelectItem>
                                    <SelectItem value="change_failure_rate" className="rounded-lg">Change Failure Rate</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="targetValue">Target Value</Label>
                                <Input
                                    id="targetValue"
                                    type="number"
                                    step="0.01"
                                    required
                                    value={formData.targetValue}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, targetValue: e.target.value })}
                                    placeholder="e.g. 2.0"
                                    className="rounded-xl border-border/50 min-h-[44px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="measurementWindow">Measurement Window</Label>
                                <Select
                                    value={formData.measurementWindow}
                                    onValueChange={(value: string) => setFormData({ ...formData, measurementWindow: value })}
                                >
                                    <SelectTrigger className="rounded-xl border-border/50 min-h-[44px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-border/50">
                                        <SelectItem value="1h" className="rounded-lg">1 Hour</SelectItem>
                                        <SelectItem value="24h" className="rounded-lg">24 Hours</SelectItem>
                                        <SelectItem value="7d" className="rounded-lg">7 Days</SelectItem>
                                        <SelectItem value="30d" className="rounded-lg">30 Days</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="thresholdWarning">Warning Threshold</Label>
                                <Input
                                    id="thresholdWarning"
                                    type="number"
                                    step="0.01"
                                    required
                                    value={formData.thresholdWarning}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, thresholdWarning: e.target.value })}
                                    placeholder="e.g. 1.6"
                                    className="rounded-xl border-border/50 min-h-[44px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="thresholdCritical">Critical Threshold</Label>
                                <Input
                                    id="thresholdCritical"
                                    type="number"
                                    step="0.01"
                                    required
                                    value={formData.thresholdCritical}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, thresholdCritical: e.target.value })}
                                    placeholder="e.g. 1.8"
                                    className="rounded-xl border-border/50 min-h-[44px]"
                                />
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end gap-3 border-t border-border/30">
                            <Link href="/sla">
                                <Button variant="outline" type="button" className="rounded-xl border-border/50 min-h-[44px] px-6">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={isPending} className="rounded-xl min-h-[44px] px-6 shadow-md shadow-primary/20 hover:shadow-primary/30">
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create SLA
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
