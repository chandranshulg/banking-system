import java.util.HashMap;
import java.util.Scanner;

class Account {
    private String accountHolder;
    private String accountNumber;
    private double balance;

    public Account(String accountHolder, String accountNumber) {
        this.accountHolder = accountHolder;
        this.accountNumber = accountNumber;
        this.balance = 0.0;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Successfully deposited: " + amount);
        } else {
            System.out.println("Deposit amount must be positive.");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Successfully withdrew: " + amount);
        } else {
            System.out.println("Invalid withdrawal amount.");
        }
    }

    public void displayBalance() {
        System.out.println("Current balance: " + balance);
    }
}

class BankingSystem {
    private HashMap<String, Account> accounts;
    private Scanner scanner;

    public BankingSystem() {
        accounts = new HashMap<>();
        scanner = new Scanner(System.in);
    }

    public void createAccount() {
        System.out.print("Enter account holder's name: ");
        String name = scanner.nextLine();
        String accountNumber = generateAccountNumber();
        Account newAccount = new Account(name, accountNumber);
        accounts.put(accountNumber, newAccount);
        System.out.println("Account created successfully. Your account number is: " + accountNumber);
    }

    public void deposit() {
        System.out.print("Enter your account number: ");
        String accountNumber = scanner.nextLine();
        Account account = accounts.get(accountNumber);

        if (account != null) {
            System.out.print("Enter amount to deposit: ");
            double amount = scanner.nextDouble();
            scanner.nextLine(); // Consume newline
            account.deposit(amount);
        } else {
            System.out.println("Account not found.");
        }
    }

    public void withdraw() {
        System.out.print("Enter your account number: ");
        String accountNumber = scanner.nextLine();
        Account account = accounts.get(accountNumber);

        if (account != null) {
            System.out.print("Enter amount to withdraw: ");
            double amount = scanner.nextDouble();
            scanner.nextLine(); // Consume newline
            account.withdraw(amount);
        } else {
            System.out.println("Account not found.");
        }
    }

    public void transfer() {
        System.out.print("Enter your account number: ");
        String fromAccountNumber = scanner.nextLine();
        Account fromAccount = accounts.get(fromAccountNumber);

        if (fromAccount != null) {
            System.out.print("Enter recipient's account number: ");
            String toAccountNumber = scanner.nextLine();
            Account toAccount = accounts.get(toAccountNumber);

            if (toAccount != null) {
                System.out.print("Enter amount to transfer: ");
                double amount = scanner.nextDouble();
                scanner.nextLine(); // Consume newline

                if (amount > 0 && amount <= fromAccount.getBalance()) {
                    fromAccount.withdraw(amount);
                    toAccount.deposit(amount);
                    System.out.println("Successfully transferred: " + amount);
                } else {
                    System.out.println("Invalid transfer amount.");
                }
            } else {
                System.out.println("Recipient account not found.");
            }
        } else {
            System.out.println("Your account not found.");
        }
    }

    public void checkBalance() {
        System.out.print("Enter your account number: ");
        String accountNumber = scanner.nextLine();
        Account account = accounts.get(accountNumber);

        if (account != null) {
            account.displayBalance();
        } else {
            System.out.println("Account not found.");
        }
    }

    private String generateAccountNumber() {
        return "AC" + (1000 + accounts.size() + 1);
    }

    public void start() {
        while (true) {
            System.out.println("\n--- Banking System Menu ---");
            System.out.println("1. Create Account");
            System.out.println("2. Deposit Money");
            System.out.println("3. Withdraw Money");
            System.out.println("4. Transfer Money");
            System.out.println("5. Check Balance");
            System.out.println("6. Exit");
            System.out.print("Choose an option: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1:
                    createAccount();
                    break;
                case 2:
                    deposit();
                    break;
                case 3:
                    withdraw();
                    break;
                case 4:
                    transfer();
                    break;
                case 5:
                    checkBalance();
                    break;
                case 6:
                    System.out.println("Thank you for using the Banking System. Goodbye!");
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    public static void main(String[] args) {
        BankingSystem bankingSystem = new BankingSystem();
        bankingSystem.start();
    }
}
