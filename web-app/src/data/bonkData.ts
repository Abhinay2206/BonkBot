// Data about BONK Bot on Solana blockchain
export const bonkBotData = {
  // Introduction data
  introduction: {
    title: "What is BONK Bot?",
    description: "BONK Bot is an automated trading and utility bot built on the Solana blockchain, specifically designed to interact with the BONK token ecosystem. It provides users with various automated functions for trading, staking, and engaging with BONK tokens efficiently.",
    image: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  
  // Ecosystem Integration
  ecosystem: {
    title: "BONK Ecosystem Integration",
    description: "BONK Bot is deeply integrated with the BONK token ecosystem on Solana, providing automated services that enhance the utility and accessibility of BONK tokens. It interacts with Solana's high-performance blockchain to execute transactions with minimal fees and maximum efficiency.",
    keyPoints: [
      "Seamless interaction with Solana-based DEXs for BONK trading",
      "Integration with BONK staking pools and yield farming protocols",
      "Support for BONK token transfers and wallet management",
      "Real-time monitoring of BONK token price and market metrics"
    ]
  },
  
  // Features
  features: [
    {
      title: "Automated Trading",
      description: "Execute BONK trades automatically based on predefined strategies and market conditions.",
      icon: "TrendingUp"
    },
    {
      title: "Price Alerts",
      description: "Receive notifications when BONK reaches target price points or experiences significant volatility.",
      icon: "Bell"
    },
    {
      title: "Yield Optimization",
      description: "Automatically stake BONK tokens in the highest-yielding pools and rebalance as needed.",
      icon: "Percent"
    },
    {
      title: "Portfolio Tracking",
      description: "Monitor your BONK holdings, transaction history, and performance metrics in real-time.",
      icon: "PieChart"
    },
    {
      title: "Limit Orders",
      description: "Set conditional buy/sell orders that execute when BONK reaches specified price points.",
      icon: "GitMerge"
    },
    {
      title: "Dollar-Cost Averaging",
      description: "Schedule regular BONK purchases to average your entry price over time.",
      icon: "Calendar"
    }
  ],
  
  // Interaction Methods
  interaction: {
    title: "How to Interact with BONK Bot",
    methods: [
      {
        title: "Web Interface",
        description: "Access BONK Bot through its intuitive web dashboard, which provides full functionality and detailed analytics.",
        steps: [
          "Connect your Solana wallet (e.g., Phantom, Solflare)",
          "Configure your BONK Bot preferences and permissions",
          "Monitor and manage your BONK-related activities"
        ]
      },
      {
        title: "Discord Integration",
        description: "Control BONK Bot directly from Discord using simple commands and receive real-time notifications.",
        steps: [
          "Join the official BONK Bot Discord server",
          "Link your Solana wallet to your Discord account",
          "Use slash commands to control BONK Bot functions"
        ]
      },
      {
        title: "Telegram Bot",
        description: "Access essential BONK Bot features through the Telegram messaging platform.",
        steps: [
          "Start a chat with the official BONK Bot on Telegram",
          "Complete the verification process",
          "Use the command menu to interact with your BONK portfolio"
        ]
      },
      {
        title: "API Integration",
        description: "Developers can integrate BONK Bot functionality directly into their own applications.",
        steps: [
          "Generate API keys from the BONK Bot developer portal",
          "Implement RESTful API calls in your application",
          "Access BONK data and functionality programmatically"
        ]
      }
    ]
  },
  
  // Comparison
  comparison: {
    title: "BONK Bot vs. Other Solana Trading Bots",
    bots: [
      {
        name: "BONK Bot",
        specialization: "BONK token ecosystem",
        tradingPairs: "BONK/SOL, BONK/USDC",
        fees: "1% trading fee",
        specialFeatures: "BONK-specific yield optimization, meme coin focus",
        userInterface: "Web, Discord, Telegram",
        speed: "Ultra-fast (Solana)",
        rating: 4.8
      },
      {
        name: "Hummingbot",
        specialization: "Cross-chain, general purpose",
        tradingPairs: "Multiple including SOL pairs",
        fees: "Varies by exchange",
        specialFeatures: "Custom strategy scripting",
        userInterface: "Desktop application, CLI",
        speed: "High",
        rating: 4.5
      },
      {
        name: "3Commas",
        specialization: "Multi-exchange trading",
        tradingPairs: "Wide range including Solana tokens",
        fees: "Subscription-based",
        specialFeatures: "Advanced grid and DCA bots",
        userInterface: "Web, mobile app",
        speed: "Medium-high",
        rating: 4.3
      },
      {
        name: "Wootrade",
        specialization: "Institutional trading",
        tradingPairs: "Selected high-liquidity pairs",
        fees: "0.1% maker, 0.1% taker",
        specialFeatures: "Algorithmic order execution",
        userInterface: "Web API, institution-focused",
        speed: "Very high",
        rating: 4.2
      }
    ]
  },
  
  // Technical Details
  technicalDetails: {
    title: "Technical Implementation",
    description: "BONK Bot leverages Solana's high-throughput blockchain architecture to provide fast, reliable, and cost-effective automated trading services specifically optimized for BONK token interactions.",
    keyPoints: [
      {
        title: "Smart Contract Integration",
        description: "BONK Bot utilizes Solana Programs (smart contracts) written in Rust, which interact with Solana's on-chain state to execute trades, manage staking, and process token transfers with minimal latency."
      },
      {
        title: "Transaction Processing",
        description: "Transactions are processed through Solana's proof-of-history consensus mechanism, allowing for sub-second finality and throughput of thousands of transactions per second."
      },
      {
        title: "Security Measures",
        description: "BONK Bot implements multiple security layers including multi-signature authorization, rate limiting, and optional time-locks for high-value transactions to protect user funds."
      },
      {
        title: "Oracle Integration",
        description: "Price data is sourced from decentralized oracles like Pyth and Switchboard, ensuring accurate and manipulation-resistant price feeds for BONK trading decisions."
      }
    ],
    codeExample: `
// Example Rust code for a simplified BONK Bot trading function
async fn execute_bonk_swap(&self, 
    from_token: &Pubkey,
    to_token: &Pubkey, 
    amount: u64, 
    slippage: f64
) -> Result<Signature, BotError> {
    let (swap_ix, signers) = self.prepare_swap_instruction(
        from_token, 
        to_token, 
        amount, 
        slippage
    )?;
    
    let recent_blockhash = self.rpc_client
        .get_latest_blockhash()
        .await?;
        
    let tx = Transaction::new_signed_with_payer(
        &[swap_ix],
        Some(&self.payer.pubkey()),
        &signers,
        recent_blockhash
    );
    
    self.rpc_client.send_and_confirm_transaction(&tx).await
}
`
  },
  
  // Risks and Limitations
  risks: {
    title: "Risks and Limitations",
    description: "While BONK Bot offers powerful automation tools, users should be aware of the following risks and limitations:",
    items: [
      {
        title: "Market Volatility Risk",
        description: "BONK token, like many meme coins, can experience extreme price volatility. Automated trading during high volatility can result in unexpected outcomes.",
        severity: "High"
      },
      {
        title: "Smart Contract Risk",
        description: "Although audited, the underlying smart contracts may contain undiscovered vulnerabilities that could potentially be exploited.",
        severity: "Medium"
      },
      {
        title: "Oracle Dependency",
        description: "BONK Bot relies on oracle price feeds, which could potentially experience delays or inaccuracies during extreme market conditions.",
        severity: "Medium"
      },
      {
        title: "Network Congestion",
        description: "During periods of high network activity on Solana, transactions may be delayed or require higher fees to be processed promptly.",
        severity: "Low"
      },
      {
        title: "API Limitations",
        description: "The bot's third-party API integrations may have rate limits or experience downtime that could affect functionality.",
        severity: "Low"
      }
    ]
  },
  
  // Statistics
  statistics: {
    title: "Usage and Adoption Statistics",
    updated: "May 2025",
    stats: [
      {
        title: "Active Users",
        value: "78,500+",
        change: "+12% MoM",
        icon: "Users"
      },
      {
        title: "Trading Volume",
        value: "$24.7M",
        change: "+8.3% MoM",
        icon: "BarChart"
      },
      {
        title: "Transactions Processed",
        value: "3.2M+",
        change: "+15% MoM",
        icon: "Repeat"
      },
      {
        title: "Total Value Locked",
        value: "$43.5M",
        change: "+5.7% MoM",
        icon: "Lock"
      }
    ],
    additionalMetrics: [
      "Average ROI: +18.2% (compared to manual trading)",
      "Average transaction cost: 0.00012 SOL",
      "Average execution time: <200ms",
      "Highest single-day trading volume: $4.3M"
    ]
  }
};