import { siteConfig } from '@/config/site';

import { Container, Row, Section, Text } from '@rax-ds/ui';

const footerLinks = [
    { href: siteConfig.links.github, label: 'GitHub' },
    { href: siteConfig.links.npm, label: 'npm' },
];

export function SiteFooter() {
    return (
        <Section as="footer" spacing="sm" className="border-t border-border">
            <Container size="full">
                <Row justify="between" gap="md" wrap>
                    <Text size="sm" color="muted">
                        Built with Radix UI and Tailwind CSS. Released under the MIT License.
                    </Text>
                    <Row gap="lg">
                        {footerLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {link.label}
                            </a>
                        ))}
                    </Row>
                </Row>
            </Container>
        </Section>
    );
}
